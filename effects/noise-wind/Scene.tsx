'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { hashSeed } from '../shared/random'
import type { EffectSceneProps } from '../types'

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uSeed;
uniform vec2 uResolution;

float hash(vec2 p) {
  p += uSeed * 0.00001;
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    value += noise(p) * amp;
    p *= 2.02;
    amp *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  vec2 wind = vec2(uTime * 0.08, -uTime * 0.025);
  float field = fbm(p * vec2(4.5, 8.5) + wind);
  float contour = abs(fract(field * 14.0) - 0.5) * 2.0;
  float line = 1.0 - smoothstep(0.055, 0.12, contour);
  float gust = smoothstep(0.15, 0.9, fbm(p * vec2(1.8, 4.0) + wind * 1.8));
  float fade = smoothstep(0.74, 0.22, length(p));
  vec3 base = vec3(0.015, 0.025, 0.023);
  vec3 ink = mix(vec3(0.40, 0.94, 0.73), vec3(0.84, 1.0, 0.86), gust);
  vec3 color = base + ink * line * fade;
  gl_FragColor = vec4(color, 1.0);
}
`

export default function NoiseWindScene({ seed, reducedMotion }: EffectSceneProps) {
  const { viewport, size } = useThree()
  const seedValue = useMemo(() => hashSeed(seed), [seed])
  const uniforms = useRef({
    uTime: { value: 0 },
    uSeed: { value: seedValue },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  })

  useFrame((_, delta) => {
    uniforms.current.uSeed.value = seedValue
    uniforms.current.uResolution.value.set(size.width, size.height)
    if (reducedMotion) return
    uniforms.current.uTime.value += delta
  })

  return (
    <>
      <color attach="background" args={['#040706']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
