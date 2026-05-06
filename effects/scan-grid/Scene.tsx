'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
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

float gridLine(float value, float width) {
  float cell = abs(fract(value) - 0.5);
  return 1.0 - smoothstep(0.0, width, cell);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float minor = max(gridLine(uv.x * 26.0 * aspect, 0.025), gridLine(uv.y * 16.0, 0.032));
  float major = max(gridLine(uv.x * 6.0 * aspect, 0.014), gridLine(uv.y * 4.0, 0.018));
  float scanY = fract(uTime * 0.12);
  float band = 1.0 - smoothstep(0.0, 0.13, abs(uv.y - scanY));
  float needle = 1.0 - smoothstep(0.0, 0.006, abs(uv.y - scanY));
  float vignette = smoothstep(0.85, 0.2, length(uv - 0.5));
  vec3 color = vec3(0.015, 0.035, 0.026);
  color += vec3(0.05, 0.24, 0.13) * minor;
  color += vec3(0.12, 0.58, 0.28) * major;
  color += vec3(0.08, 0.52, 0.2) * band;
  color += vec3(0.7, 1.0, 0.56) * needle;
  gl_FragColor = vec4(color * vignette, 1.0);
}
`

export default function ScanGridScene({ reducedMotion }: EffectSceneProps) {
  const { viewport, size } = useThree()
  const uniforms = useRef({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  })

  useEffect(() => {
    uniforms.current.uResolution.value.set(size.width, size.height)
  }, [size.width, size.height])

  useFrame((_, delta) => {
    if (reducedMotion) return
    uniforms.current.uTime.value += delta
  })

  return (
    <>
      <color attach="background" args={['#020604']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
