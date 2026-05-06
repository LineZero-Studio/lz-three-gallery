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
uniform vec2 uCursor;
uniform vec2 uResolution;

float line(float value, float width) {
  return 1.0 - smoothstep(width, width * 1.9, abs(value));
}

float gridLine(float value, float scale, float width) {
  return 1.0 - smoothstep(width, width * 1.7, abs(fract(value * scale) - 0.5));
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5);
  float amp = 0.12 + (uCursor.y + 0.5) * 0.18;
  float time = uTime * 0.72;
  float wave = sin(p.x * 8.0 - time) * amp + sin(p.x * 17.0 + time * 0.55) * 0.045;
  float ghostWave = sin(p.x * 8.0 - time + 0.55) * amp + sin(p.x * 17.0 + time * 0.55 + 0.9) * 0.045;
  float trace = line(p.y - wave, 0.009);
  float ghost = line(p.y - ghostWave, 0.006);
  float axis = line(p.y, 0.003) + line(p.x, 0.003);
  float grid = gridLine(vUv.x, 12.0, 0.016) * 0.32 + gridLine(vUv.y, 8.0, 0.016) * 0.32;
  float trigger = line(p.x - uCursor.x * aspect, 0.004) * 0.55;

  vec3 bg = vec3(0.006, 0.012, 0.010);
  vec3 phosphor = vec3(0.37, 1.0, 0.62);
  vec3 amber = vec3(1.0, 0.72, 0.30);
  vec3 color = bg + phosphor * grid * 0.22;
  color += phosphor * trace * 0.9;
  color += phosphor * ghost * 0.22;
  color += amber * trigger * 0.36 + phosphor * axis * 0.28;
  gl_FragColor = vec4(color, 1.0);
}
`

export default function ScopeTraceScene({ reducedMotion }: EffectSceneProps) {
  const { viewport, pointer, size } = useThree()
  const uniforms = useRef({
    uTime: { value: 0 },
    uCursor: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  })

  useFrame((_, delta) => {
    uniforms.current.uCursor.value.set(pointer.x * 0.5, pointer.y * 0.5)
    uniforms.current.uResolution.value.set(size.width, size.height)
    if (reducedMotion) return
    uniforms.current.uTime.value += delta
  })

  return (
    <>
      <color attach="background" args={['#010605']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
