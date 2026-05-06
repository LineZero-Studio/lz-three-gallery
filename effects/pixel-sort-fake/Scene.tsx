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

float hash(float value) {
  return fract(sin(value * 41.13 + uSeed * 0.0001) * 43758.5453123);
}

void main() {
  float rowCount = 38.0;
  float row = floor(vUv.y * rowCount);
  float localY = fract(vUv.y * rowCount);
  float shift = (hash(row) - 0.5) * 0.28 + sin(uTime * 0.32 + hash(row + 5.0) * 6.283) * 0.035;
  float x = fract(vUv.x + shift);
  float gate = smoothstep(0.12, 0.2, localY) * smoothstep(0.92, 0.7, localY);
  float blocks = step(0.5 + hash(row + 11.0) * 0.32, fract(x * mix(4.0, 13.0, hash(row + 2.0))));
  float fine = step(0.86, fract((x + row * 0.013) * 47.0));
  vec3 paper = vec3(0.06, 0.045, 0.035);
  vec3 amber = vec3(1.0, 0.58, 0.17);
  vec3 pink = vec3(0.94, 0.12, 0.32);
  vec3 cream = vec3(0.98, 0.88, 0.62);
  vec3 color = paper;
  color = mix(color, amber, gate * blocks * 0.85);
  color = mix(color, pink, gate * step(0.8, hash(row + 23.0)) * fine);
  color = mix(color, cream, gate * step(0.92, hash(row + 3.0)) * blocks);
  gl_FragColor = vec4(color, 1.0);
}
`

export default function PixelSortFakeScene({ seed, reducedMotion }: EffectSceneProps) {
  const { viewport } = useThree()
  const seedValue = useMemo(() => hashSeed(seed), [seed])
  const uniforms = useRef({
    uTime: { value: 0 },
    uSeed: { value: seedValue },
  })

  useFrame((_, delta) => {
    uniforms.current.uSeed.value = seedValue
    if (reducedMotion) return
    uniforms.current.uTime.value += delta
  })

  return (
    <>
      <color attach="background" args={['#0f0b08']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
