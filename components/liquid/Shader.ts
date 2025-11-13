// Simplex noise function for organic, fluid motion
export const noise = `
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 0.0;
  for (int i = 0; i < 4; i++) {
    value += amplitude * snoise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// Anisotropic FBM: creates flowing patterns by stretching/rotating noise space
float anisotropicFbm(vec3 p, float flowAngle, float flowStrength, float anisotropy) {
  // Create rotation matrix for flow direction
  float cosAngle = cos(flowAngle);
  float sinAngle = sin(flowAngle);
  
  // Rotate XY plane to align with flow direction
  vec2 rotatedXY = vec2(
    p.x * cosAngle - p.y * sinAngle,
    p.x * sinAngle + p.y * cosAngle
  );
  
  // Apply anisotropic scaling: stretch along flow direction, compress perpendicular
  // anisotropy > 1: stretch along flow (creates streaks)
  // anisotropy < 1: compress along flow (creates bands)
  vec2 scaledXY = rotatedXY * vec2(anisotropy, 1.0 / anisotropy);
  
  // Reconstruct 3D position with transformed XY
  vec3 transformedP = vec3(scaledXY, p.z);
  
  // Sample FBM at transformed coordinates
  return fbm(transformedP);
}

// Domain-warped FBM with anisotropic flow: combines warping with directional flow
float domainWarpedFbm(vec3 p, float warpStrength, float flowAngle, float flowStrength, float anisotropy) {
  // Create flow direction vector
  vec2 flowDir = vec2(cos(flowAngle), sin(flowAngle));
  
  // Sample noise to create flow field
  float flowNoise = snoise(p * 0.3) * flowStrength;
  
  // Create anisotropic coordinate transformation
  float cosAngle = cos(flowAngle);
  float sinAngle = sin(flowAngle);
  
  // Rotate to flow direction
  vec2 rotatedXY = vec2(
    p.x * cosAngle - p.y * sinAngle,
    p.x * sinAngle + p.y * cosAngle
  );
  
  // Apply anisotropic scaling
  vec2 scaledXY = rotatedXY * vec2(anisotropy, 1.0 / anisotropy);
  
  // Add flow-based offset (creates directional movement)
  vec2 flowOffset = flowDir * flowNoise * flowStrength;
  scaledXY += flowOffset;
  
  // Warp coordinates using low octave noise
  float warpFrequency = 0.5;
  float warpNoise1 = snoise(vec3(scaledXY, p.z) * warpFrequency) * warpStrength;
  float warpNoise2 = snoise((vec3(scaledXY, p.z) + vec3(50.0, 50.0, 0.0)) * warpFrequency) * warpStrength;
  
  // Apply warp with flow direction bias
  vec3 warpedP = vec3(scaledXY, p.z) + vec3(warpNoise1, warpNoise2, warpNoise1 * 0.5);
  
  // Sample FBM at warped, anisotropically transformed coordinates
  return fbm(warpedP);
}
`

export const vertex = `
varying vec3 vPosition;
varying vec2 vUv;
uniform float uTime;
uniform float uScrollProgress;
uniform float uAmplitude;
uniform float uSpeed;
uniform float uScale;
uniform float uNumContours;
uniform float uWarpStrength;
uniform float uFlowAngle;
uniform float uFlowStrength;
uniform float uAnisotropy;

${noise}

float calculateHeight(vec2 worldPos, float timeOffset) {
  vec3 samplePos = vec3(worldPos * uScale, timeOffset);
  float noiseValue = domainWarpedFbm(samplePos, uWarpStrength, uFlowAngle, uFlowStrength, uAnisotropy);
  float normalizedNoise = (noiseValue + 1.0) * 0.5;
  float contourRing = floor(normalizedNoise * uNumContours);
  contourRing = clamp(contourRing, 0.0, uNumContours - 1.0);
  float ringProgress = fract(normalizedNoise * uNumContours);
  float smoothVariation = smoothstep(0.0, 1.0, ringProgress) * 0.1;
  return (contourRing / uNumContours) * uAmplitude + smoothVariation * uAmplitude;
}

void main() {
  vUv = uv;
  
  vec3 pos = position;
  
  // Create animated height field using noise
  // Map UV to world space (plane is 1x1, so position.xy is in [-0.5, 0.5])
  vec2 worldPos = pos.xy * 10.0; // Scale to match fragment shader
  float timeOffset = uTime * uSpeed + uScrollProgress * 2.0;
  
  // Calculate height
  float height = calculateHeight(worldPos, timeOffset);
  
  pos.z = height;
  vPosition = pos;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

export const fragment = `
varying vec3 vPosition;
varying vec2 vUv;
uniform float uTime;
uniform float uScrollProgress;
uniform vec3 uColor;
uniform float uLineWidth;
uniform float uNumContours;
uniform float uScale;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uMode;
uniform float uLightIntensity;
uniform float uWarpStrength;
uniform float uFlowAngle;
uniform float uFlowStrength;
uniform float uAnisotropy;

${noise}

// Helper function to calculate height from world position
float calculateHeight(vec2 worldPos, float timeOffset) {
  vec3 samplePos = vec3(worldPos * uScale, timeOffset);
  float noiseValue = domainWarpedFbm(samplePos, uWarpStrength, uFlowAngle, uFlowStrength, uAnisotropy);
  float normalizedNoise = (noiseValue + 1.0) * 0.5;
  float contourRing = floor(normalizedNoise * uNumContours);
  contourRing = clamp(contourRing, 0.0, uNumContours - 1.0);
  float ringProgress = fract(normalizedNoise * uNumContours);
  float smoothVariation = smoothstep(0.0, 1.0, ringProgress) * 0.1;
  return (contourRing / uNumContours) * uAmplitude + smoothVariation * uAmplitude;
}

void main() {
  // Calculate height at this position using UV coordinates
  // Map UV from [0,1] to world space
  vec2 worldPos = (vUv - 0.5) * 10.0; // Scale to match plane size
  float timeOffset = uTime * uSpeed + uScrollProgress * 2.0;
  
  // Get noise value once and reuse it
  vec3 samplePos = vec3(worldPos * uScale, timeOffset);
  float noiseValue = domainWarpedFbm(samplePos, uWarpStrength, uFlowAngle, uFlowStrength, uAnisotropy);
  float normalizedNoise = (noiseValue + 1.0) * 0.5;
  
  // Calculate height from normalized noise
  float contourRing = floor(normalizedNoise * uNumContours);
  contourRing = clamp(contourRing, 0.0, uNumContours - 1.0);
  float ringProgress = fract(normalizedNoise * uNumContours);
  float smoothVariation = smoothstep(0.0, 1.0, ringProgress) * 0.1;
  float height = (contourRing / uNumContours) * uAmplitude + smoothVariation * uAmplitude;
  
  // Create contour lines by checking if we're near a ring boundary
  // The ring boundary is where normalizedNoise * uNumContours crosses an integer
  float contourValue = normalizedNoise * uNumContours;
  // Get distance to nearest contour line (0 at contour, 0.5 at midpoint)
  float distToContour = abs(fract(contourValue) - 0.5) * 2.0;
  
  // Render line if close to contour level
  // distToContour ranges from 0 (at contour) to 1 (at midpoint between contours)
  // We want to render when distToContour is small
  // In surfaces mode, set line width to 0
  float effectiveLineWidth = mix(uLineWidth, 0.0, uMode);
  float lineThreshold = effectiveLineWidth;
  float line = 1.0 - smoothstep(0.0, lineThreshold, distToContour);
  
  // Use single color
  vec3 baseColor = uColor;
  
  // Calculate normal for lighting (always calculate, but only use in surfaces mode)
  float eps = 0.02;
  float heightX = calculateHeight(worldPos + vec2(eps, 0.0), timeOffset);
  float heightY = calculateHeight(worldPos + vec2(0.0, eps), timeOffset);
  
  // Calculate normal from height differences
  vec3 normal = normalize(vec3(
    (height - heightX) / eps,
    (height - heightY) / eps,
    1.0
  ));
  
  // Apply lighting
  vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0)); // Directional light
  float lighting = dot(normal, lightDir);
  lighting = lighting * 0.5 + 0.5; // Convert from [-1,1] to [0,1]
  lighting = clamp(lighting, 0.0, 1.0); // Ensure valid range
  lighting = mix(1.0, lighting, uLightIntensity); // Blend with ambient
  
  // Mix between lines and surfaces mode
  vec3 color;
  float alpha;
  
  if (uMode < 0.5) {
    // Lines mode: render only contour lines (no lighting)
    color = baseColor;
    alpha = line;
    if (alpha < 0.01) {
      alpha = 0.0; // Fully transparent background
    }
  } else {
    // Surfaces mode: render lit surfaces without lines
    color = baseColor * lighting;
    alpha = 1.0; // Fully opaque for surfaces
  }
  
  gl_FragColor = vec4(color, alpha);
}
`

