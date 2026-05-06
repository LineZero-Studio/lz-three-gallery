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

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  
  float baseStripe = sin(uv.y * 82.0) * 0.5 + 0.5;
  float distortion = sin(uv.y * 3.0 + uTime * 0.8) * 0.15 + sin(uv.y * 7.0 - uTime * 0.5) * 0.08;
  float shifted = sin((uv.x + distortion) * 52.0 * baseStripe) * 0.5 + 0.5;
  
  float wave = sin(uv.y * 2.4 + uTime * 0.6) * 0.5 + 0.5;
  float stripe = smoothstep(0.2, 0.8, shifted) * wave;
  
  vec3 paper = vec3(0.96, 0.94, 0.90);
  vec3 ink = vec3(0.12, 0.10, 0.14);
  vec3 highlight = vec3(0.98, 0.96, 0.92);
  
  vec3 color = mix(ink, paper, stripe);
  color = mix(color, highlight, smoothstep(0.75, 0.95, stripe) * 0.3);
  
  float vignette = smoothstep(0.85, 0.25, length(uv - 0.5));
  color *= 0.85 + vignette * 0.15;
  
  gl_FragColor = vec4(color, 1.0);
}
`

export default function ScrollStripesScene({ reducedMotion }: EffectSceneProps) {
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
      <color attach="background" args={['#f6f4ef']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}