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
uniform vec2 uResolution;

float hash(vec2 value) {
  return fract(sin(dot(value, vec2(127.1, 311.7)) + uSeed * 0.00019) * 43758.5453123);
}

float circleLine(float dist, float radius, float width) {
  return 1.0 - smoothstep(width, width * 1.7, abs(dist - radius));
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = vUv;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  vec2 cursor = vec2(uCursor.x * aspect, uCursor.y);
  float d = length(p - cursor);
  float pulseA = circleLine(d, fract(uTime * 0.18) * 0.95, 0.008) * (1.0 - smoothstep(0.45, 0.95, fract(uTime * 0.18) * 0.95));
  float pulseB = circleLine(d, fract(uTime * 0.18 + 0.45) * 0.95, 0.006) * (1.0 - smoothstep(0.45, 0.95, fract(uTime * 0.18 + 0.45) * 0.95));
  vec2 cell = floor((uv + vec2(uTime * 0.008, 0.0)) * vec2(44.0, 28.0));
  vec2 local = fract((uv + vec2(uTime * 0.008, 0.0)) * vec2(44.0, 28.0)) - 0.5;
  float keep = step(0.84, hash(cell));
  float dotShape = 1.0 - smoothstep(0.06, 0.16, length(local));
  float pull = 1.0 - smoothstep(0.05, 0.7, d);
  float target = circleLine(d, 0.12, 0.006) + circleLine(d, 0.22, 0.005);

  vec3 bg = vec3(0.012, 0.010, 0.018);
  vec3 gold = vec3(1.0, 0.78, 0.32);
  vec3 pink = vec3(1.0, 0.25, 0.48);
  vec3 color = bg;
  color += gold * keep * dotShape * (0.16 + pull * 0.44);
  color += pink * (pulseA + pulseB) * 0.82;
  color += vec3(1.0, 0.93, 0.76) * target * 0.74;
  gl_FragColor = vec4(color, 1.0);
}
`

export default function FieldPulseScene({ seed, reducedMotion }: EffectSceneProps) {
  const { viewport, pointer, size } = useThree()
  const seedValue = useMemo(() => hashSeed(seed), [seed])
  const uniforms = useRef({
    uTime: { value: 0 },
    uSeed: { value: seedValue },
    uCursor: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  })

  useFrame((_, delta) => {
    uniforms.current.uSeed.value = seedValue
    uniforms.current.uCursor.value.set(pointer.x * 0.5, pointer.y * 0.5)
    uniforms.current.uResolution.value.set(size.width, size.height)
    if (reducedMotion) return
    uniforms.current.uTime.value += delta
  })

  return (
    <>
      <color attach="background" args={['#05040a']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
