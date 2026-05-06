'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import type { EffectSceneProps } from '../types'

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uAmplitude;

void main() {
  vUv = uv;
  vec3 pos = position;
  float dist = length(pos.xy);
  float mask = 1.0 - smoothstep(0.05, 2.4, dist);
  float ring = sin(dist * 12.0 - uTime * 2.4);
  pos.z += ring * mask * uAmplitude;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;
uniform vec3 uPaper;
uniform vec3 uInk;

float gridLine(float value, float width) {
  float cell = abs(fract(value) - 0.5);
  return 1.0 - smoothstep(0.0, width, cell);
}

void main() {
  vec2 uv = vUv - 0.5;
  float grid = max(gridLine(vUv.x * 18.0, 0.035), gridLine(vUv.y * 12.0, 0.045));
  float target = 1.0 - smoothstep(0.035, 0.04, abs(length(uv) - 0.18));
  vec3 color = mix(uPaper, uInk, grid * 0.65 + target);
  gl_FragColor = vec4(color, 1.0);
}
`

export default function BulgeScene({ reducedMotion }: EffectSceneProps) {
  const uniforms = useRef({
    uTime: { value: 0 },
    uAmplitude: { value: 0.46 },
    uPaper: { value: new THREE.Color('#ece4d4') },
    uInk: { value: new THREE.Color('#16130f') },
  })

  useFrame((_, delta) => {
    if (reducedMotion) return
    uniforms.current.uTime.value += delta
  })

  return (
    <>
      <color attach="background" args={['#ece4d4']} />
      <mesh rotation={[-0.18, 0, 0]}>
        <planeGeometry args={[6, 4, 48, 48]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
