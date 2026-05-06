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
  return fract(sin(value * 39.71 + uSeed * 0.00013) * 43758.5453123);
}

void main() {
  vec2 uv = vUv;
  float columns = 18.0;
  float id = floor(uv.x * columns);
  float localX = fract(uv.x * columns);
  float speed = mix(0.04, 0.16, hash(id + 4.0));
  float phase = fract(uv.y + uTime * speed + hash(id));
  float bar = smoothstep(0.64, 0.5, phase) * smoothstep(0.08, 0.22, phase);
  float edge = smoothstep(0.06, 0.16, localX) * smoothstep(0.94, 0.78, localX);
  float sideInk = step(0.78, hash(id + 12.0)) * edge * 0.65;
  float overprint = step(0.68, fract((uv.y + hash(id + 6.0)) * 9.0)) * bar;
  vec3 paper = vec3(0.93, 0.84, 0.66);
  vec3 red = vec3(0.82, 0.07, 0.035);
  vec3 blueBlack = vec3(0.04, 0.055, 0.065);
  vec3 color = paper;
  color = mix(color, blueBlack, sideInk);
  color = mix(color, red, bar * edge * (0.55 + overprint * 0.45));
  color *= 0.92 + hash(id + floor(uv.y * 28.0)) * 0.08;
  gl_FragColor = vec4(color, 1.0);
}
`

export default function InkBarsScene({ seed, reducedMotion }: EffectSceneProps) {
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
      <color attach="background" args={['#edd6a8']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
