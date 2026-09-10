export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * One shader for every photograph on the page.
 *
 * `uMode` selects a physical idea rather than an amount of the same effect:
 *   0 refract  — architecture. Slow, edge-aware bending plus pointer parallax.
 *   1 material — dunes/terrain. Low-frequency drift along the flow of the form.
 *   2 optical  — glass. Still until the pointer bends it locally.
 *   3 current  — water. Horizontal displacement with a trailing pointer field.
 *   4 kinetic  — human. Directional stretch driven only by scroll velocity.
 *
 * Grading is applied after sampling so eight different source photographs
 * resolve into one printed, editorial universe.
 */
export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2 uPlaneSize;
  uniform float uTexAspect;
  uniform vec2 uFocal;

  uniform float uTime;
  uniform int uMode;

  uniform float uHover;
  uniform vec2 uPointer;
  uniform float uVelocity;
  uniform float uScroll;

  uniform float uDisplacement;
  uniform float uPointerInfluence;
  uniform float uScrollInfluence;
  uniform float uChromatic;

  uniform float uRadius;
  uniform float uReveal;
  uniform float uReady;
  uniform float uOpacity;

  uniform float uSaturation;
  uniform float uContrast;
  uniform float uLift;
  uniform float uWarmth;
  uniform float uGray;

  varying vec2 vUv;

  float sdRoundBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // Cheap value noise — enough for a slow material drift and the reveal edge.
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Cover-fit around the art-directed focal point, so nothing ever stretches
  // and the important part of the frame survives the crop.
  vec2 coverUv(vec2 uv) {
    float planeAspect = uPlaneSize.x / max(uPlaneSize.y, 1.0);
    vec2 ratio = vec2(
      min(planeAspect / uTexAspect, 1.0),
      min(uTexAspect / planeAspect, 1.0)
    );
    vec2 offset = (vec2(1.0) - ratio) * uFocal;
    return clamp(uv * ratio + offset, 0.0015, 0.9985);
  }

  void main() {
    vec2 uv = vUv;

    // Gentle zoom under the pointer.
    uv = (uv - 0.5) / (1.0 + uHover * 0.04) + 0.5;

    vec2 aspect = vec2(uPlaneSize.x / max(uPlaneSize.y, 1.0), 1.0);
    vec2 toPointer = (uv - 0.5 - uPointer) * aspect;
    float pointerDist = length(toPointer);
    float pointerField = exp(-pointerDist * pointerDist * 7.0);

    float amount = uDisplacement;
    float chroma = 0.0;
    vec2 shift = vec2(0.0);

    if (uMode == 0) {
      // Architecture: a very slow standing refraction across the structure,
      // plus a parallax lean towards the cursor. Hover is what really drives
      // it — at rest the frame is almost still, under the pointer it bends.
      float slow = noise(uv * 2.2 + uTime * 0.035) - 0.5;
      shift += vec2(slow, slow * 0.45) * 0.010 * amount;
      shift += (uPointer * 0.012 * uPointerInfluence) * (0.35 + uHover * 0.65);
      shift += normalize(toPointer + vec2(0.0001)) * pointerField
             * (0.006 + uHover * 0.020)
             * amount * uPointerInfluence * (0.3 + uVelocity * 0.7);
      shift.y += uScroll * 0.006 * uScrollInfluence;
      chroma = uChromatic * uVelocity * (0.25 + uHover * 0.75) * 0.0022;

    } else if (uMode == 1) {
      // Material: low-frequency drift along the flow of the dunes, so the
      // boundary between light and shadow breathes rather than ripples.
      vec2 flow = normalize(vec2(0.94, 0.34));
      float phase = dot(uv, flow) * 2.6 + uTime * 0.045;
      float band = noise(vec2(phase, dot(uv, vec2(-flow.y, flow.x)) * 3.1)) - 0.5;
      shift += flow * band * 0.011 * amount;
      shift += flow * uScroll * 0.010 * uScrollInfluence;
      shift += normalize(toPointer + vec2(0.0001)) * pointerField * 0.004
             * amount * uPointerInfluence;
      chroma = 0.0;

    } else if (uMode == 2) {
      // Optical: the frame is still. The pointer bends a local lens through it.
      float lens = pointerField * pointerField;
      float edge = smoothstep(0.62, 0.0, pointerDist);
      shift += normalize(toPointer + vec2(0.0001)) * lens * 0.030
             * amount * uPointerInfluence * (0.25 + uHover * 0.75);
      shift += toPointer * edge * 0.008 * amount;
      chroma = uChromatic * lens * (0.2 + uVelocity * 0.8) * 0.0035;

    } else if (uMode == 3) {
      // Current: horizontal displacement with a pointer field that trails
      // slightly behind the cursor and settles back to equilibrium.
      float lane = noise(vec2(uv.y * 5.0, uTime * 0.09)) - 0.5;
      shift.x += lane * 0.010 * amount;
      float trail = pointerField * (0.35 + uVelocity * 0.9);
      shift += vec2(normalize(toPointer + vec2(0.0001)).x, 0.0) * trail * 0.024
             * amount * uPointerInfluence;
      shift.x += uScroll * 0.008 * uScrollInfluence;
      chroma = uChromatic * trail * 0.0026;

    } else {
      // Kinetic: nothing moves until the page does. Directional stretch that
      // appears only during active scrolling and returns immediately.
      float stretch = uScroll * uScrollInfluence;
      shift.y += stretch * 0.020 * amount;
      uv.y = 0.5 + (uv.y - 0.5) * (1.0 - stretch * 0.05 * amount);
      chroma = uChromatic * abs(stretch) * 0.0022;
    }

    // Reveal: a soft noise threshold that wipes the frame in, combined with a
    // 1.03 → 1 settle. Runs once on entry.
    float reveal = clamp(uReveal, 0.0, 1.0);
    float grain = noise(vUv * vec2(7.0, 5.0));
    float wipe = smoothstep(0.0, 1.0, reveal * 1.35 - (vUv.y * 0.35 + grain * 0.28));
    float settle = mix(1.03, 1.0, reveal);
    uv = (uv - 0.5) / settle + 0.5;
    shift *= mix(0.25, 1.0, reveal);

    uv += shift;

    vec3 colour;
    if (chroma > 0.00001) {
      colour.r = texture2D(uTexture, coverUv(uv + vec2(chroma, 0.0))).r;
      colour.g = texture2D(uTexture, coverUv(uv)).g;
      colour.b = texture2D(uTexture, coverUv(uv - vec2(chroma, 0.0))).b;
    } else {
      colour = texture2D(uTexture, coverUv(uv)).rgb;
    }

    /* ---- editorial grade ---------------------------------------------- */
    float luma = dot(colour, vec3(0.2126, 0.7152, 0.0722));
    colour = mix(vec3(luma), colour, uSaturation);
    colour = (colour - 0.5) * uContrast + 0.5;
    colour += uLift * (1.0 - luma);
    colour += vec3(uWarmth, uWarmth * 0.35, -uWarmth * 0.55) * smoothstep(0.35, 1.0, luma);
    colour = mix(colour, vec3(luma), clamp(uGray, 0.0, 1.0));

    // Fine grain keeps the surface printed rather than plastic.
    colour += (hash(vUv * uPlaneSize + floor(uTime * 10.0)) - 0.5) * 0.028;
    colour = clamp(colour, 0.0, 1.0);

    vec2 pixel = (vUv - 0.5) * uPlaneSize;
    float dist = sdRoundBox(pixel, uPlaneSize * 0.5, min(uRadius, min(uPlaneSize.x, uPlaneSize.y) * 0.5));
    float mask = 1.0 - smoothstep(-1.0, 1.0, dist);

    gl_FragColor = vec4(colour, mask * wipe * uOpacity * uReady);
  }
`;
