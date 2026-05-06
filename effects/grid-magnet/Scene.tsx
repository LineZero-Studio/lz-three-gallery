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

float gridLine(vec2 uv, float scale, float width) {
  vec2 cell = abs(fract(uv * scale) - 0.5);
  float line = min(cell.x, cell.y);
  return 1.0 - smoothstep(0.0, width, line);
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = vUv;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  vec2 c = vec2(uCursor.x * aspect, uCursor.y);
  vec2 toCursor = p - c;
  float d = length(toCursor) + 0.001;
  vec2 bend = normalize(toCursor) * (0.095 / (d + 0.18));
  vec2 warped = vec2(uv.x + bend.x * 0.24 + sin(uv.y * 5.0 + uTime * 0.25) * 0.018, uv.y + bend.y * 0.24);
  float coarse = gridLine(warped, 9.0, 0.018);
  float fine = gridLine(warped + vec2(uTime * 0.015, 0.0), 24.0, 0.01);
  float target = 1.0 - smoothstep(0.0, 0.022, abs(d - 0.16));
  vec3 bg = vec3(0.015, 0.018, 0.019);
  vec3 grid = vec3(0.22, 0.88, 0.72);
  vec3 targetColor = vec3(0.95, 1.0, 0.86);
  vec3 color = bg + grid * (coarse * 0.68 + fine * 0.18) + targetColor * target;
  gl_FragColor = vec4(color, 1.0);
}
`

export default function GridMagnetScene({ reducedMotion }: EffectSceneProps) {
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
      <color attach="background" args={['#040606']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
