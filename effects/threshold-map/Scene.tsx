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
uniform vec2 uCursor;

float hash(vec2 value) {
  return fract(sin(dot(value, vec2(91.7, 13.3)) + uSeed * 0.00031) * 43758.5453123);
}

void main() {
  vec2 scaled = vUv * vec2(34.0, 22.0);
  vec2 cell = floor(scaled);
  vec2 local = fract(scaled) - 0.5;
  float box = 1.0 - step(0.43, max(abs(local.x), abs(local.y)));
  float value = hash(cell);
  float wave = sin(cell.x * 0.32 + cell.y * 0.61 + uTime * 0.65) * 0.11;
  float threshold = clamp(0.18 + (uCursor.x + 0.5) * 0.64, 0.18, 0.82);
  float lit = step(threshold, value + wave);
  float near = 1.0 - smoothstep(0.015, 0.085, abs((value + wave) - threshold));
  float ruler = 1.0 - smoothstep(0.004, 0.012, abs(vUv.x - threshold));

  vec3 bg = vec3(0.008, 0.010, 0.011);
  vec3 darkCell = vec3(0.035, 0.055, 0.060);
  vec3 litCell = vec3(0.72, 0.96, 0.86);
  vec3 amber = vec3(1.0, 0.66, 0.24);
  vec3 color = mix(bg, darkCell, box);
  color = mix(color, litCell, lit * box * 0.85);
  color += amber * near * box * 0.32 + amber * ruler * 0.44;
  gl_FragColor = vec4(color, 1.0);
}
`

export default function ThresholdMapScene({ seed, reducedMotion }: EffectSceneProps) {
  const { viewport, pointer } = useThree()
  const seedValue = useMemo(() => hashSeed(seed), [seed])
  const uniforms = useRef({
    uTime: { value: 0 },
    uSeed: { value: seedValue },
    uCursor: { value: new THREE.Vector2(0, 0) },
  })

  useFrame((_, delta) => {
    uniforms.current.uSeed.value = seedValue
    uniforms.current.uCursor.value.set(pointer.x * 0.5, pointer.y * 0.5)
    if (reducedMotion) return
    uniforms.current.uTime.value += delta
  })

  return (
    <>
      <color attach="background" args={['#020404']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
