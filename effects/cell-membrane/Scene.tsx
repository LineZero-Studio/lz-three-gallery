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

vec2 hash2(vec2 value) {
  float x = fract(sin(dot(value, vec2(127.1, 311.7)) + uSeed * 0.00017) * 43758.5453123);
  float y = fract(sin(dot(value, vec2(269.5, 183.3)) + uSeed * 0.00023) * 43758.5453123);
  return vec2(x, y);
}

void main() {
  vec2 scaled = vUv * vec2(9.0, 6.0);
  vec2 base = floor(scaled);
  float nearest = 10.0;
  float secondNearest = 10.0;
  float identity = 0.0;

  for (int y = -1; y <= 1; y += 1) {
    for (int x = -1; x <= 1; x += 1) {
      vec2 cell = base + vec2(float(x), float(y));
      vec2 wobble = hash2(cell);
      vec2 point = cell + 0.5 + (wobble - 0.5) * 0.38 + sin(uTime * 0.22 + wobble * 6.28318) * 0.06;
      float dist = dot(point - scaled, point - scaled);
      if (dist < nearest) {
        secondNearest = nearest;
        nearest = dist;
        identity = hash2(cell + 3.0).x;
      } else if (dist < secondNearest) {
        secondNearest = dist;
      }
    }
  }

  float membrane = 1.0 - smoothstep(0.018, 0.075, secondNearest - nearest);
  float nucleus = 1.0 - smoothstep(0.012, 0.035, nearest);
  float fill = 0.16 + identity * 0.14;
  vec3 bg = vec3(0.018, 0.014, 0.012);
  vec3 amber = vec3(0.92, 0.62, 0.26);
  vec3 teal = vec3(0.26, 0.82, 0.72);
  vec3 color = bg + amber * fill;
  color += teal * membrane * 0.76;
  color += vec3(1.0, 0.88, 0.56) * nucleus * 0.36;
  gl_FragColor = vec4(color, 1.0);
}
`

export default function CellMembraneScene({ seed, reducedMotion }: EffectSceneProps) {
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
      <color attach="background" args={['#050302']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
