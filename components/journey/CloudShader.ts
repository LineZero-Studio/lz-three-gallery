// Volumetric cloud shaders based on Guerrilla Games and Frostbite techniques
export const cloudVertex = `
varying vec3 vWorldPosition;
varying vec3 vViewDirection;

void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vViewDirection = normalize(worldPosition.xyz - cameraPosition);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const cloudFragment = `
uniform vec3 uSunPosition;
uniform float uTime;
uniform float uCloudCover;
uniform float uCloudDensity;
uniform vec3 uSkyColor;
uniform vec3 uCloudColor;
uniform vec3 uCloudOffset;
uniform float uAbsorption;
uniform float uScatteringG;
uniform float uBackScatterG;
uniform float uBackScatterMix;
uniform float uPowderStrength;
uniform float uMultipleScatterSamples;
uniform float uLightStepSize;
uniform float uRayStepSize;
uniform int uMaxLightSamples;
uniform int uMaxRaySamples;

varying vec3 vWorldPosition;
varying vec3 vViewDirection;

// ==================== TILED PERLIN NOISE ====================

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

// Tiled Perlin noise - mod positions in hash function for tiling
float snoise(vec3 v, float tileScale) {
    // Mod for tiling
    v = mod(v * tileScale, 289.0) / tileScale;
    
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    // Mod for tiling in hash
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// Tiled FBM - mod positions for each octave
float fbm(vec3 p, float tileScale) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 4; i++) {
        value += amplitude * snoise(p * frequency, tileScale * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    
    return value;
}

// ==================== TILED WORLEY NOISE ====================

// Hash function with tiling support
vec3 hash33(vec3 p) {
    p = vec3(
        dot(p, vec3(127.1, 311.7, 74.7)),
        dot(p, vec3(269.5, 183.3, 246.1)),
        dot(p, vec3(113.5, 271.9, 124.6))
    );
    return fract(sin(p) * 43758.5453123);
}

// Tiled Worley noise - mod cell offsets for tiling
float worleyNoise(vec3 p, float tileSize) {
    vec3 cell = floor(p);
    vec3 cellPos = fract(p);
    float minDist = 8.0;
    
    // Check 27 neighbors (3D)
    for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
            for (int z = -1; z <= 1; z++) {
                vec3 neighbor = cell + vec3(float(x), float(y), float(z));
                
                // Mod cell offsets for tiling - this is the key fix!
                neighbor = mod(neighbor, tileSize);
                
                vec3 point = hash33(neighbor) - 0.5;
                vec3 diff = cellPos - (vec3(float(x), float(y), float(z)) + point);
                float dist = length(diff);
                minDist = min(minDist, dist);
            }
        }
    }
    
    return 1.0 - minDist; // Invert for puffy shapes
}

// Worley FBM - multiple octaves of Worley noise
float worleyFBM(vec3 p, float tileSize) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 3; i++) {
        value += amplitude * worleyNoise(p * frequency, tileSize * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    
    return value;
}

// ==================== CLOUD DENSITY ====================

// Cloud density using Worley FBM to remap Perlin (cauliflower effect)
float cloudDensity(vec3 pos) {
    vec3 p = (pos - uCloudOffset) * 0.015;
    p.y += uTime * 0.005;
    
    float tileSize = 16.0; // Tiling size
    
    // Perlin noise
    float perlin = fbm(p, tileSize);
    
    // Worley FBM
    float worley = worleyFBM(p * 0.8, tileSize * 0.8);
    
    // Use Worley to remap Perlin for cauliflower appearance (Frostbite technique)
    float remappedPerlin = worley * (1.0 - perlin * 0.5);
    
    // Combine for final density
    float density = remappedPerlin;
    
    density = smoothstep(uCloudCover, uCloudCover + uCloudDensity, density);
    return max(density, 0.0);
}

// ==================== BEER'S LAW & POWDER ====================

// Beer's Law
float beersLaw(float absorption, float distance) {
    return exp(-absorption * distance);
}

// Powdered sugar effect (Beer's Powder approximation)
// Beer's law: exp(-d)
// Powder equation: 1 - e^-d*2
// Combined approximation per transcript: modifies energy drop-off at start
float beersPowder(float absorption, float distance) {
    float d = absorption * distance;
    float beer = exp(-d);
    float powder = 1.0 - exp(-d * 2.0);
    // Beer's Powder: combines both effects
    // When powder strength is 0, we get pure Beer's law
    // When powder strength increases, we get more complex energy distribution
    return beer * (1.0 + powder * uPowderStrength);
}

// ==================== HENYEY-GREENSTEIN PHASE FUNCTION ====================

// Forward Henyey-Greenstein (forward scattering)
float henyeyGreensteinForward(float cosTheta, float g) {
    float g2 = g * g;
    return (1.0 - g2) / pow(1.0 + g2 - 2.0 * g * cosTheta, 1.5);
}

// Backward Henyey-Greenstein (back scattering)
float henyeyGreensteinBackward(float cosTheta, float g) {
    float g2 = g * g;
    return (1.0 - g2) / pow(1.0 + g2 + 2.0 * g * cosTheta, 1.5);
}

// Mix forward and backward for improved back scattering (Frostbite technique)
float phaseFunction(float cosTheta, float gForward, float gBackward, float mixFactor) {
    float forward = henyeyGreensteinForward(cosTheta, gForward);
    float backward = henyeyGreensteinBackward(cosTheta, gBackward);
    return mix(forward, backward, mixFactor);
}

// ==================== LIGHT SAMPLING ====================

// Sample light energy by ray marching towards light source
float sampleLightEnergy(vec3 pos, vec3 lightDir) {
    float transmittance = 1.0;
    float stepSize = uLightStepSize;
    float absorption = uAbsorption;
    
    int maxSamples = uMaxLightSamples;
    int samples = 0;
    
    // Ray march towards light
    for (int i = 0; i < maxSamples; i++) {
        samples++;
        vec3 samplePos = pos + lightDir * float(i) * stepSize;
        float density = cloudDensity(samplePos);
        
        if (density > 0.01) {
            // Accumulate optical depth
            float segmentDepth = density * stepSize;
            transmittance *= beersLaw(absorption, segmentDepth);
        }
        
        // Early exit if transmittance is very low
        if (transmittance < 0.01) break;
    }
    
    return transmittance;
}

// Multiple scattering samples with lower extinction (Sony Pictures technique)
// Takes multiple samples, lowering extinction for each, allowing more light through
float sampleLightEnergyMultiple(vec3 pos, vec3 lightDir) {
    if (uMultipleScatterSamples <= 1.0) {
        return sampleLightEnergy(pos, lightDir);
    }
    
    float totalEnergy = 0.0;
    float numSamples = uMultipleScatterSamples;
    
    for (float i = 0.0; i < numSamples; i += 1.0) {
        // Lower extinction for each sample: later samples use progressively lower absorption
        float sampleAbsorption = uAbsorption / (1.0 + i * 0.5);
        
        // Sample with reduced absorption
        float transmittance = 1.0;
        float stepSize = uLightStepSize;
        int maxSamples = uMaxLightSamples;
        
        for (int j = 0; j < maxSamples; j++) {
            vec3 samplePos = pos + lightDir * float(j) * stepSize;
            float density = cloudDensity(samplePos);
            
            if (density > 0.01) {
                float segmentDepth = density * stepSize;
                transmittance *= beersLaw(sampleAbsorption, segmentDepth);
            }
            
            if (transmittance < 0.01) break;
        }
        
        totalEnergy += transmittance;
    }
    
    return totalEnergy / numSamples;
}

// ==================== MAIN RENDERING ====================

void main() {
    vec3 rayOrigin = cameraPosition;
    vec3 rayDir = normalize(vViewDirection);
    vec3 lightDir = normalize(uSunPosition);
    
    // Cloud box bounds
    vec3 boxMin = uCloudOffset + vec3(-40.0, 8.0, -30.0);
    vec3 boxMax = uCloudOffset + vec3(40.0, 25.0, 30.0);
    
    // Ray-box intersection
    vec3 invDir = 1.0 / rayDir;
    vec3 t0 = (boxMin - rayOrigin) * invDir;
    vec3 t1 = (boxMax - rayOrigin) * invDir;
    vec3 tMin = min(t0, t1);
    vec3 tMax = max(t0, t1);
    
    float near = max(max(tMin.x, tMin.y), tMin.z);
    float far = min(min(tMax.x, tMax.y), tMax.z);
    
    if (near > far || far < 0.0) {
        discard;
    }
    
    near = max(near, 0.0);
    far = min(far, 200.0);
    
    // Ray marching parameters
    float stepSize = uRayStepSize;
    float absorption = uAbsorption;
    
    vec3 transmittance = vec3(1.0);
    vec3 lightEnergy = vec3(0.0);
    float opticalDepth = 0.0;
    
    int maxSamples = uMaxRaySamples;
    int samples = 0;
    
    // Ray march through cloud volume
    for (float t = near; t < far && samples < maxSamples; t += stepSize) {
        samples++;
        vec3 samplePos = rayOrigin + rayDir * t;
        
        // Skip if outside cloud bounds
        if (samplePos.y < boxMin.y || samplePos.y > boxMax.y) {
            continue;
        }
        
        // Sample density at this point
        float density = cloudDensity(samplePos);
        
        if (density > 0.02) {
            // Calculate distance through medium for this segment
            float segmentDepth = density * stepSize;
            opticalDepth += segmentDepth;
            
            // Beer's Powder approximation (instead of just Beer's Law)
            float powderTransmittance = beersPowder(absorption, segmentDepth);
            transmittance *= vec3(powderTransmittance);
            
            // Calculate light energy reaching this point
            vec3 toLight = normalize(uSunPosition - samplePos);
            float lightEnergyValue = sampleLightEnergyMultiple(samplePos, toLight);
            
            // Phase function (anisotropic scattering with back scattering)
            float cosTheta = dot(rayDir, toLight);
            float phase = phaseFunction(cosTheta, uScatteringG, uBackScatterG, uBackScatterMix);
            
            // Accumulate light energy
            lightEnergy += transmittance * density * stepSize * lightEnergyValue * phase;
            
            // Early exit if too opaque
            if (transmittance.r < 0.01) break;
        }
    }
    
    // Final color composition
    vec3 cloudColor = uCloudColor;
    vec3 skyColor = uSkyColor;
    
    // Mix sky and cloud based on transmittance
    vec3 color = mix(skyColor, cloudColor, opticalDepth * 0.3);
    
    // Add scattered light energy
    color += lightEnergy * cloudColor * 1.5;
    
    // Final blend with sky
    color = mix(skyColor, color, 1.0 - transmittance.r);
    
    float alpha = 1.0 - transmittance.r;
    alpha = min(alpha, 0.85);
    
    if (alpha < 0.02) {
        discard;
    }
    
    gl_FragColor = vec4(color, alpha);
}
`
