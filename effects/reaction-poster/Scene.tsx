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
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5);
  float time = uTime * 0.12;
  float field = sin(p.x * 13.0 + sin(p.y * 5.0 + time) * 2.2);
  field += sin(p.y * 15.0 + cos(p.x * 4.0 - time) * 2.0);
  field += sin((p.x - p.y) * 9.0 + time * 2.5) * 0.7;
  float islands = smoothstep(0.04, 0.18, field);
  float contour = 1.0 - smoothstep(0.018, 0.064, abs(fract(field * 0.22 + time * 0.35) - 0.5));
  float poster = step(0.055, vUv.x) * step(0.055, vUv.y) * (1.0 - step(0.945, vUv.x)) * (1.0 - step(0.945, vUv.y));
  vec3 paper = vec3(0.89, 0.82, 0.66);
  vec3 black = vec3(0.035, 0.030, 0.026);
  vec3 red = vec3(0.76, 0.10, 0.07);
  vec3 blue = vec3(0.08, 0.18, 0.32);
  vec3 color = mix(paper, blue, islands * poster * 0.55);
  color = mix(color, red, contour * poster * 0.58);
  color = mix(black, color, poster);
  gl_FragColor = vec4(color, 1.0);
}
`

export default function ReactionPosterScene({ reducedMotion }: EffectSceneProps) {
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
      <color attach="background" args={['#080604']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
