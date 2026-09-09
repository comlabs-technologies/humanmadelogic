export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * One shader for every image on the page. Uniforms decide how much of each
 * effect a given surface gets, which is what keeps the hero fan, the studio
 * plate and the project stills reading as one treatment.
 */
export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2 uPlaneSize;
  uniform float uTexAspect;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uPointer;
  uniform float uVelocity;
  uniform float uScroll;
  uniform float uRadius;
  uniform float uGray;
  uniform float uZoom;
  uniform float uOpacity;
  uniform float uDistortion;
  uniform float uReady;

  varying vec2 vUv;

  float sdRoundBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // Scales UVs so the texture covers the plane without ever stretching.
  vec2 coverUv(vec2 uv) {
    float planeAspect = uPlaneSize.x / max(uPlaneSize.y, 1.0);
    vec2 ratio = vec2(
      min(planeAspect / uTexAspect, 1.0),
      min(uTexAspect / planeAspect, 1.0)
    );
    return clamp((uv - 0.5) * ratio + 0.5, 0.0018, 0.9982);
  }

  void main() {
    vec2 uv = vUv;

    // Gentle zoom: a little at rest, a little more under the pointer.
    float zoom = 1.0 + uZoom * 0.05 + uHover * 0.04;
    uv = (uv - 0.5) / zoom + 0.5;

    // Soft liquid refraction that falls off away from the pointer.
    vec2 aspect = vec2(uPlaneSize.x / max(uPlaneSize.y, 1.0), 1.0);
    vec2 toPointer = (uv - 0.5 - uPointer) * aspect;
    float falloff = exp(-dot(toPointer, toPointer) * 6.0);
    float strength = uDistortion * (0.012 + uHover * 0.05) * (0.4 + uVelocity)
                   + abs(uScroll) * 0.018 * uDistortion;
    uv -= normalize(toPointer + vec2(0.0001)) * falloff * strength;

    // RGB separation only while something is actually moving fast.
    float split = (uVelocity * 0.010 + abs(uScroll) * 0.005) * (0.25 + uHover * 0.9) * uDistortion;

    vec3 colour;
    colour.r = texture2D(uTexture, coverUv(uv + vec2(split, 0.0))).r;
    colour.g = texture2D(uTexture, coverUv(uv)).g;
    colour.b = texture2D(uTexture, coverUv(uv - vec2(split, 0.0))).b;

    float luma = dot(colour, vec3(0.2126, 0.7152, 0.0722));
    colour = mix(colour, vec3(luma), clamp(uGray, 0.0, 1.0));

    // Fine film grain, animated slowly so it never crawls.
    float grain = hash(vUv * uPlaneSize + floor(uTime * 12.0));
    colour += (grain - 0.5) * 0.035;

    // Rounded-corner mask in real pixels, so radii match the CSS around it.
    vec2 pixel = (vUv - 0.5) * uPlaneSize;
    float dist = sdRoundBox(pixel, uPlaneSize * 0.5, min(uRadius, min(uPlaneSize.x, uPlaneSize.y) * 0.5));
    float mask = 1.0 - smoothstep(-1.0, 1.0, dist);

    gl_FragColor = vec4(colour, mask * uOpacity * uReady);
  }
`;
