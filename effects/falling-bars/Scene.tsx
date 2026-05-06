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
  return fract(sin(value * 17.17 + uSeed * 0.0001) * 43758.5453123);
}

void main() {
  float columns = 30.0;
  float id = floor(vUv.x * columns);
  float localX = fract(vUv.x * columns);
  float speed = mix(0.08, 0.28, hash(id));
  float offset = hash(id + 9.0);
  float y = fract(vUv.y + uTime * speed + offset);
  float dash = smoothstep(0.72, 0.52, y) * smoothstep(0.05, 0.22, y);
  float columnMask = smoothstep(0.08, 0.16, localX) * smoothstep(0.92, 0.74, localX);
  float cut = step(0.28 + hash(id + 4.0) * 0.55, fract(vUv.y * 18.0 + hash(id + 2.0)));
  float ink = dash * columnMask * (0.35 + cut * 0.65);
  vec3 paper = vec3(0.95, 0.87, 0.72);
  vec3 red = vec3(0.82, 0.13, 0.08);
  vec3 black = vec3(0.04, 0.035, 0.03);
  vec3 color = mix(paper, black, step(0.73, hash(id + 12.0)) * columnMask * 0.85);
  color = mix(color, red, ink);
  gl_FragColor = vec4(color, 1.0);
}
`

export default function FallingBarsScene({ seed, reducedMotion }: EffectSceneProps) {
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
      <color attach="background" args={['#f2deba']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
