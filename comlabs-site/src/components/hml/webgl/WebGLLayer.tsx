'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { fragmentShader, vertexShader } from './shader';
import { getSurfaces, markSurfaceReady, subscribeToSurfaces, type Surface } from './registry';
import { SURFACE_MODE_IDS } from '@/config/media';
import { scrollState } from '../SmoothScrollProvider';
import { pointerState } from '@/lib/hml/usePointerVelocity';

const textureCache = new Map<string, THREE.Texture>();
const failed = new Set<string>();

function loadTexture(src: string, onLoad: (texture: THREE.Texture) => void) {
  if (failed.has(src)) return;

  const cached = textureCache.get(src);
  if (cached) {
    onLoad(cached);
    return;
  }

  const loader = new THREE.TextureLoader();
  // The supplied photography is served cross-origin.
  loader.setCrossOrigin('anonymous');
  loader.load(
    src,
    (texture) => {
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      textureCache.set(src, texture);
      onLoad(texture);
    },
    undefined,
    () => {
      // CORS refusal or a network failure: leave the DOM photograph visible.
      failed.add(src);
    },
  );
}

/** `50% 40%` → vec2(0.5, 0.4). */
function parseFocal(position: string): THREE.Vector2 {
  const [x = '50%', y = '50%'] = position.trim().split(/\s+/);
  return new THREE.Vector2(parseFloat(x) / 100, parseFloat(y) / 100);
}

type Plane = {
  surface: Surface;
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  requested: boolean;
  ready: boolean;
};

const GEOMETRY = new THREE.PlaneGeometry(1, 1, 1, 1);

function Surfaces({ reducedMotion }: { reducedMotion: boolean }) {
  const { scene, size } = useThree();
  const planes = useRef(new Map<string, Plane>());
  const [version, setVersion] = useState(0);

  useEffect(() => subscribeToSurfaces(() => setVersion((value) => value + 1)), []);

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

      const { asset } = surface;
      const { treatment } = asset;
      const crop = surface.compact ? asset.mobile : asset.desktop;

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
          uFocal: { value: parseFocal(crop.position) },

          uTime: { value: 0 },
          uMode: { value: SURFACE_MODE_IDS[treatment.mode] },

          uHover: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uVelocity: { value: 0 },
          uScroll: { value: 0 },

          uDisplacement: { value: reducedMotion ? 0 : treatment.displacement },
          uPointerInfluence: { value: reducedMotion ? 0 : treatment.pointerInfluence },
          uScrollInfluence: { value: reducedMotion ? 0 : treatment.scrollInfluence },
          uChromatic: { value: reducedMotion ? 0 : treatment.chromatic },

          uRadius: { value: asset.radius },
          uReveal: { value: reducedMotion ? 1 : 0 },
          uReady: { value: 0 },
          uOpacity: { value: 1 },

          uSaturation: { value: treatment.grade.saturation },
          uContrast: { value: treatment.grade.contrast },
          uLift: { value: treatment.grade.lift },
          uWarmth: { value: treatment.grade.warmth },
          uGray: { value: surface.restGrayscale ?? 0 },
        },
      });

      const mesh = new THREE.Mesh(GEOMETRY, material);
      mesh.frustumCulled = false;
      mesh.matrixAutoUpdate = false;
      scene.add(mesh);

      current.set(surface.id, { surface, mesh, material, requested: false, ready: false });
    });
  }, [scene, version, reducedMotion]);

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
    const scrollVelocity = Math.max(-2, Math.min(2, scrollState.velocity * 0.02));

    planes.current.forEach((plane) => {
      const { surface, mesh, material } = plane;
      const element = surface.element;

      // IntersectionObserver decides whether this plane costs anything at all.
      if (!element.isConnected || !surface.inView) {
        mesh.visible = false;
        return;
      }

      const rect = element.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) {
        mesh.visible = false;
        return;
      }
      mesh.visible = true;

      if (!plane.requested) {
        plane.requested = true;
        loadTexture(surface.asset.src, (texture) => {
          material.uniforms.uTexture.value = texture;
          material.uniforms.uTexAspect.value = texture.image.width / texture.image.height;
          plane.ready = true;
          markSurfaceReady(surface.id);
        });
      }

      // Read back CSS/GSAP transforms so the plane sits exactly on the node.
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

      const damping = surface.asset.treatment.damping;

      surface.reveal += (surface.revealTarget - surface.reveal) * Math.min(1, step * 1.3);
      uniforms.uReveal.value = surface.reveal;

      surface.hover += (surface.hoverTarget - surface.hover) * Math.min(1, step * damping);
      uniforms.uHover.value = surface.hover;

      const localX = (pointer.x - centreX) / Math.max(width, 1);
      const localY = -(pointer.y - centreY) / Math.max(height, 1);
      const target = uniforms.uPointer.value as THREE.Vector2;
      target.x += (localX - target.x) * Math.min(1, step * damping);
      target.y += (localY - target.y) * Math.min(1, step * damping);

      uniforms.uVelocity.value +=
        (pointer.velocity - uniforms.uVelocity.value) * Math.min(1, step * damping * 0.8);
      uniforms.uScroll.value +=
        (scrollVelocity - uniforms.uScroll.value) * Math.min(1, step * damping * 0.7);

      // Desaturated at rest, colour returning where the cursor is.
      const grayTarget = surface.grayTarget * (1 - surface.hover * 0.85);
      uniforms.uGray.value += (grayTarget - uniforms.uGray.value) * Math.min(1, step * 5);

      if (plane.ready) {
        uniforms.uReady.value = Math.min(1, uniforms.uReady.value + step * 2.2);
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

export default function WebGLLayer({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const [lost, setLost] = useState(false);

  // Cap DPR, and cap it harder on devices that are unlikely to keep up.
  const dpr = useMemo<[number, number]>(() => {
    if (typeof navigator === 'undefined') return [1, 1.5];
    const cores = navigator.hardwareConcurrency ?? 8;
    const ceiling = cores <= 4 ? 1.15 : cores <= 6 ? 1.4 : 1.75;
    return [1, ceiling];
  }, []);

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
      document
        .querySelectorAll('[data-webgl-ready]')
        .forEach((node) => node.removeAttribute('data-webgl-ready'));
      textureCache.forEach((texture) => texture.dispose());
      textureCache.clear();
    };
  }, []);

  useEffect(() => {
    if (!lost) return;
    delete document.documentElement.dataset.webgl;
    document
      .querySelectorAll('[data-webgl-ready]')
      .forEach((node) => node.removeAttribute('data-webgl-ready'));
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
        <Surfaces reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
