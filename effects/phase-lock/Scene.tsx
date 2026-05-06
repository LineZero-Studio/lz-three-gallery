'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
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
uniform vec2 uResolution;

float line(float value, float width) {
  return 1.0 - smoothstep(width, width * 1.85, abs(value));
}

float grid(float value, float scale) {
  return 1.0 - smoothstep(0.015, 0.028, abs(fract(value * scale) - 0.5));
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5);
  float phase = sin(uTime * 0.28) * 1.35;
  float lock = 1.0 - smoothstep(0.05, 0.38, abs(phase));
  float carrier = sin(p.x * 9.0 - uTime * 0.68);
  float a = carrier * 0.18 + sin(p.x * 21.0 + uTime * 0.22) * 0.025;
  float b = sin(p.x * 9.0 - uTime * 0.68 + phase) * 0.18 + sin(p.x * 21.0 + uTime * 0.22 + phase) * 0.025;
  float traceA = line(p.y - a - 0.08, 0.007);
  float traceB = line(p.y - b + 0.08, 0.007);
  float mid = line(p.y, 0.003);
  float gridLines = (grid(vUv.x, 10.0) + grid(vUv.y, 8.0)) * 0.16;
  float lockBand = lock * (1.0 - smoothstep(0.18, 0.32, abs(p.y)));

  vec3 bg = vec3(0.005, 0.007, 0.012);
  vec3 cyan = vec3(0.22, 0.82, 1.0);
  vec3 red = vec3(1.0, 0.34, 0.40);
  vec3 white = vec3(0.86, 0.95, 1.0);
  vec3 color = bg + white * gridLines;
  color += cyan * traceA * 0.82 + red * traceB * 0.78;
  color += white * mid * 0.3 + white * lockBand * 0.08;
  color += vec3(0.72, 1.0, 0.8) * lock * (traceA + traceB) * 0.25;
  gl_FragColor = vec4(color, 1.0);
}
`

export default function PhaseLockScene({ reducedMotion }: EffectSceneProps) {
  const { viewport, size } = useThree()
  const uniforms = useRef({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  })

  useFrame((_, delta) => {
    uniforms.current.uResolution.value.set(size.width, size.height)
    if (reducedMotion) return
    uniforms.current.uTime.value += delta
  })

  return (
    <>
      <color attach="background" args={['#010207']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
