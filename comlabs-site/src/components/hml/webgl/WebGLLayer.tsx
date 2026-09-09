'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { fragmentShader, vertexShader } from './shader';
import { getSurfaces, subscribeToSurfaces, type Surface } from './registry';
import { scrollState } from '../SmoothScrollProvider';
import { pointerState } from '@/lib/hml/usePointerVelocity';

const textureCache = new Map<string, THREE.Texture>();

function loadTexture(src: string, onLoad: (texture: THREE.Texture) => void) {
  const cached = textureCache.get(src);
  if (cached) {
    onLoad(cached);
    return;
  }
  new THREE.TextureLoader().load(src, (texture) => {
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    textureCache.set(src, texture);
    onLoad(texture);
  });
}

type Plane = {
  surface: Surface;
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  requested: boolean;
};

const GEOMETRY = new THREE.PlaneGeometry(1, 1, 1, 1);

function Surfaces() {
  const { scene, size } = useThree();
  const planes = useRef(new Map<string, Plane>());
  const [version, setVersion] = useState(0);

  useEffect(() => subscribeToSurfaces(() => setVersion((value) => value + 1)), []);

  // Create and destroy planes to match whatever is registered right now.
  useEffect(() => {
    const current = planes.current;
    const surfaces = getSurfaces();
    const ids = new Set(surfaces.map((surface) => surface.id));

    current.forEach((plane, id) => {
      if (ids.has(id)) return;
      scene.remove(plane.mesh);
      plane.material.dispose();
      current.delete(id);
    });

    surfaces.forEach((surface) => {
      if (current.has(surface.id)) return;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        uniforms: {
          uTexture: { value: null },
          uPlaneSize: { value: new THREE.Vector2(1, 1) },
          uTexAspect: { value: 1 },
          uTime: { value: 0 },
          uHover: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uVelocity: { value: 0 },
          uScroll: { value: 0 },
          uRadius: { value: surface.radius ?? 14 },
          uGray: { value: surface.restGrayscale ?? 0 },
          uZoom: { value: 0 },
          uOpacity: { value: 1 },
          uDistortion: { value: surface.distortion ?? 1 },
          uReady: { value: 0 },
        },
      });

      const mesh = new THREE.Mesh(GEOMETRY, material);
      mesh.frustumCulled = false;
      mesh.matrixAutoUpdate = false;
      scene.add(mesh);

      current.set(surface.id, { surface, mesh, material, requested: false });
    });

    return undefined;
  }, [scene, version]);

  useEffect(() => {
    const current = planes.current;
    return () => {
      current.forEach((plane) => {
        scene.remove(plane.mesh);
        plane.material.dispose();
      });
      current.clear();
    };
  }, [scene]);

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05);
    const halfWidth = size.width / 2;
    const halfHeight = size.height / 2;
    const pointer = pointerState.current;

    planes.current.forEach((plane) => {
      const { surface, mesh, material } = plane;
      const element = surface.element;
      if (!element.isConnected) return;

      const rect = element.getBoundingClientRect();
      const visible =
        rect.bottom > -size.height * 0.4 &&
        rect.top < size.height * 1.4 &&
        rect.width > 0 &&
        rect.height > 0;

      mesh.visible = visible;
      if (!visible) return;

      // Load the texture the first time the surface comes near the viewport.
      if (!plane.requested) {
        plane.requested = true;
        loadTexture(surface.src, (texture) => {
          material.uniforms.uTexture.value = texture;
          material.uniforms.uTexAspect.value = texture.image.width / texture.image.height;
        });
      }

      // The element may be rotated or scaled by CSS/GSAP — read that back so
      // the plane sits exactly where the DOM node is.
      const transform = getComputedStyle(element).transform;
      let scale = 1;
      let rotation = 0;
      if (transform && transform !== 'none') {
        const matrix = new DOMMatrixReadOnly(transform);
        scale = Math.hypot(matrix.a, matrix.b) || 1;
        rotation = Math.atan2(matrix.b, matrix.a);
      }
      const width = element.offsetWidth * scale;
      const height = element.offsetHeight * scale;

      const centreX = rect.left + rect.width / 2;
      const centreY = rect.top + rect.height / 2;

      mesh.position.set(centreX - halfWidth, halfHeight - centreY, 0);
      mesh.scale.set(width, height, 1);
      mesh.rotation.z = -rotation;
      mesh.updateMatrix();

      const uniforms = material.uniforms;
      uniforms.uPlaneSize.value.set(width, height);
      uniforms.uTime.value += step;

      surface.hover += (surface.hoverTarget - surface.hover) * Math.min(1, step * 7);
      uniforms.uHover.value = surface.hover;

      // Pointer position in the plane's own space, -0.5 … 0.5.
      const localX = (pointer.x - centreX) / Math.max(width, 1);
      const localY = -(pointer.y - centreY) / Math.max(height, 1);
      const target = uniforms.uPointer.value as THREE.Vector2;
      target.x += (localX - target.x) * Math.min(1, step * 9);
      target.y += (localY - target.y) * Math.min(1, step * 9);

      uniforms.uVelocity.value += (pointer.velocity - uniforms.uVelocity.value) * Math.min(1, step * 6);
      uniforms.uScroll.value +=
        (Math.max(-2, Math.min(2, scrollState.velocity * 0.02)) * (surface.scrollInfluence ?? 1) -
          uniforms.uScroll.value) *
        Math.min(1, step * 5);

      uniforms.uGray.value += (surface.grayTarget - uniforms.uGray.value) * Math.min(1, step * 5);

      const zoomTarget = (surface.hoverZoom ?? 0) * surface.hover;
      uniforms.uZoom.value += (zoomTarget - uniforms.uZoom.value) * Math.min(1, step * 6);

      if (uniforms.uTexture.value) {
        uniforms.uReady.value = Math.min(1, uniforms.uReady.value + step * 2.5);
      }
    });
  });

  return null;
}

/** Suspends the render loop when the tab is hidden. */
function VisibilityGate() {
  const setFrameloop = useThree((state) => state.setFrameloop);

  useEffect(() => {
    const apply = () => setFrameloop(document.hidden ? 'never' : 'always');
    document.addEventListener('visibilitychange', apply);
    apply();
    return () => document.removeEventListener('visibilitychange', apply);
  }, [setFrameloop]);

  return null;
}

export default function WebGLLayer() {
  const [lost, setLost] = useState(false);
  const dpr = useMemo<[number, number]>(() => [1, 1.75], []);

  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    document.documentElement.dataset.webgl = 'on';
    gl.domElement.addEventListener(
      'webglcontextlost',
      (event) => {
        event.preventDefault();
        setLost(true);
      },
      { once: true },
    );
  }, []);

  useEffect(() => {
    return () => {
      delete document.documentElement.dataset.webgl;
    };
  }, []);

  useEffect(() => {
    if (lost) {
      delete document.documentElement.dataset.webgl;
    }
  }, [lost]);

  if (lost) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5]">
      <Canvas
        orthographic
        dpr={dpr}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 100], near: 0.1, far: 1000, zoom: 1 }}
        onCreated={onCreated}
        style={{ width: '100%', height: '100%' }}
      >
        <VisibilityGate />
        <Surfaces />
      </Canvas>
    </div>
  );
}
