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

float hash(vec2 value) {
  return fract(sin(dot(value, vec2(12.9898, 78.233)) + uSeed * 0.00023) * 43758.5453123);
}

float plane(vec2 uv, vec2 shift, float phase) {
  vec2 scaled = (uv + shift) * vec2(36.0, 24.0);
  vec2 cell = floor(scaled);
  vec2 local = fract(scaled) - 0.5;
  float box = 1.0 - step(0.42, max(abs(local.x), abs(local.y)));
  float value = hash(cell + phase);
  float gate = step(0.64 + sin((cell.y + phase) * 0.37 + uTime * 0.4) * 0.08, value);
  return box * gate;
}

void main() {
  vec2 uv = vUv;
  float red = plane(uv, vec2(0.012, 0.0), 3.0);
  float green = plane(uv, vec2(-0.004, 0.010), 19.0);
  float blue = plane(uv, vec2(0.0, -0.012), 41.0);
  float frame = step(0.035, uv.x) * step(0.035, uv.y) * (1.0 - step(0.965, uv.x)) * (1.0 - step(0.965, uv.y));
  vec3 bg = vec3(0.008, 0.009, 0.012);
  vec3 color = bg + vec3(red * 0.9, green * 0.86, blue * 1.0) * frame;
  color += vec3(0.75, 0.85, 1.0) * (red * green * blue) * 0.28;
  gl_FragColor = vec4(color, 1.0);
}
`

export default function BitplaneShiftScene({ seed, reducedMotion }: EffectSceneProps) {
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
      <color attach="background" args={['#010104']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
