'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import type { EffectSceneProps } from '../types'

const vertexShader = `
varying vec2 vUv;
uniform float uTime;

void main() {
  vUv = uv;
  vec3 pos = position;
  float vertical = (uv.y - 0.5) * 2.0;
  float fold = sin(vertical * 5.4 + uTime * 0.75) * 0.12;
  pos.x += fold + sin(pos.x * 4.0 + uTime * 0.45) * 0.04;
  pos.z += sin(pos.x * 5.2 + vertical * 3.0 + uTime * 0.8) * 0.28;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;

void main() {
  float wave = sin(vUv.y * 8.0 + uTime * 0.5) * 0.025;
  float stripes = smoothstep(0.36, 0.42, abs(sin((vUv.x + wave) * 3.14159 * 18.0)));
  float verticalFade = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.78, vUv.y);
  float centerLight = 1.0 - smoothstep(0.08, 0.62, abs(vUv.x - 0.5));
  vec3 ink = vec3(0.63, 0.58, 1.0);
  vec3 paper = vec3(0.05, 0.045, 0.12);
  vec3 color = mix(paper, ink, stripes * verticalFade * (0.45 + centerLight * 0.45));
  gl_FragColor = vec4(color, 1.0);
}
`

export default function WaveCurtainScene({ reducedMotion }: EffectSceneProps) {
  const { viewport } = useThree()
  const uniforms = useRef({
    uTime: { value: 0 },
  })

  useFrame((_, delta) => {
    if (reducedMotion) return
    uniforms.current.uTime.value += delta
  })

  return (
    <>
      <color attach="background" args={['#0d0b1f']} />
      <mesh scale={[viewport.width * 0.88, viewport.height * 0.86, 1]}>
        <planeGeometry args={[1, 1, 48, 36]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}
