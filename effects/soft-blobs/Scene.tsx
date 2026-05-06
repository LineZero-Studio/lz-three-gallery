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

float hash(float value) {
  return fract(sin(value * 29.17 + uSeed * 0.0001) * 43758.5453123);
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5);
  float field = 0.0;
  for (int i = 0; i < 7; i++) {
    float id = float(i);
    float angle = hash(id + 2.0) * 6.28318 + uTime * mix(0.08, 0.22, hash(id + 8.0));
    float orbit = mix(0.10, 0.46, hash(id + 3.0));
    vec2 center = vec2(cos(angle), sin(angle * 0.87)) * orbit;
    center.x += (hash(id + 12.0) - 0.5) * 0.28;
    center.y += (hash(id + 17.0) - 0.5) * 0.18;
    float radius = mix(0.12, 0.24, hash(id + 5.0));
    float d = length(p - center);
    field += radius * radius / max(d * d, 0.002);
  }
  float blob = smoothstep(1.12, 1.5, field);
  float edge = smoothstep(1.0, 1.22, field) - smoothstep(1.72, 2.2, field);
  vec3 bg = vec3(0.045, 0.035, 0.06);
  vec3 violet = vec3(0.54, 0.35, 1.0);
  vec3 mint = vec3(0.45, 1.0, 0.72);
  vec3 color = mix(bg, mix(violet, mint, vUv.y), blob * 0.88);
  color += edge * vec3(0.8, 0.9, 1.0) * 0.12;
  gl_FragColor = vec4(color, 1.0);
}
`

export default function SoftBlobsScene({ seed, reducedMotion }: EffectSceneProps) {
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
      <color attach="background" args={['#0b0910']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
