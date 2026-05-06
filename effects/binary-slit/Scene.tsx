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
  return fract(sin(value * 23.71 + uSeed * 0.00011) * 43758.5453123);
}

void main() {
  vec2 uv = vUv;
  float lane = floor(uv.y * 18.0);
  float laneLocal = fract(uv.y * 18.0);
  float speed = mix(-0.16, 0.19, hash(lane + 4.0));
  float x = uv.x * 92.0 + uTime * speed + hash(lane) * 12.0;
  float bit = step(0.56, hash(floor(x) + lane * 97.0));
  float cell = 1.0 - step(0.82, fract(x));
  float laneMask = smoothstep(0.08, 0.16, laneLocal) * (1.0 - smoothstep(0.78, 0.94, laneLocal));
  float scanY = fract(uTime * 0.075 + 0.18);
  float scan = 1.0 - smoothstep(0.004, 0.018, abs(uv.y - scanY));
  float slit = step(0.45, uv.x) * (1.0 - step(0.55, uv.x));
  float barcode = bit * cell * laneMask;

  vec3 bg = vec3(0.006, 0.006, 0.006);
  vec3 white = vec3(0.88, 0.90, 0.88);
  vec3 blue = vec3(0.12, 0.56, 1.0);
  vec3 color = mix(bg, white, barcode * (0.28 + slit * 0.72));
  color += blue * scan * (0.25 + barcode * 0.35);
  gl_FragColor = vec4(color, 1.0);
}
`

export default function BinarySlitScene({ seed, reducedMotion }: EffectSceneProps) {
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
      <color attach="background" args={['#010101']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
