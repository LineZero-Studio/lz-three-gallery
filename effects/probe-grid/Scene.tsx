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

float axisLine(float value, float width) {
  return 1.0 - smoothstep(width, width * 1.8, abs(value));
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = vUv;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  vec2 cursor = vec2(uCursor.x * aspect, uCursor.y);
  vec2 delta = p - cursor;
  float dist = length(delta) + 0.001;
  vec2 bend = normalize(delta) * 0.06 / (dist + 0.13);
  vec2 warped = uv + vec2(bend.x / max(aspect, 0.001), bend.y) * 0.34;
  warped.x += sin(uv.y * 11.0 + uTime * 0.18) * 0.004;

  float coarse = gridLine(warped, 8.0, 0.025);
  float fine = gridLine(warped, 32.0, 0.008);
  float xAxis = axisLine(p.x - cursor.x, 0.006);
  float yAxis = axisLine(p.y - cursor.y, 0.006);
  float tick = step(0.82, fract((p.x + p.y + uTime * 0.03) * 18.0)) * (xAxis + yAxis) * 0.45;
  float target = 1.0 - smoothstep(0.006, 0.014, abs(dist - 0.18));
  float aperture = smoothstep(0.0, 0.18, uv.x) * (1.0 - smoothstep(0.82, 1.0, uv.x)) * smoothstep(0.0, 0.12, uv.y) * (1.0 - smoothstep(0.88, 1.0, uv.y));

  vec3 bg = vec3(0.006, 0.014, 0.015);
  vec3 grid = vec3(0.19, 0.83, 0.64);
  vec3 white = vec3(0.9, 1.0, 0.9);
  vec3 color = bg + grid * (coarse * 0.55 + fine * 0.17);
  color += white * (target * 0.72 + tick);
  color *= 0.64 + aperture * 0.36;
  gl_FragColor = vec4(color, 1.0);
}
`

export default function ProbeGridScene({ reducedMotion }: EffectSceneProps) {
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
      <color attach="background" args={['#020808']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
