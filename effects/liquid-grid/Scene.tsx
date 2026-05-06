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

float grid(vec2 uv, float lineWidth) {
  vec2 grid = abs(fract(uv - 0.5) - 0.5) / fwidth(uv);
  float line = min(grid.x, grid.y);
  return 1.0 - min(line, 1.0);
}

void main() {
  vec2 uv = vUv;
  float time = uTime * 0.18;
  
  vec2 warp = vec2(
    sin(uv.y * 6.0 + time * 0.7) * 0.12 + sin(uv.y * 3.0 - time * 0.4) * 0.08,
    cos(uv.x * 7.0 + time * 0.5) * 0.10 + cos(uv.x * 4.0 + time * 0.3) * 0.06
  );
  
  vec2 warpedUv = uv + warp;
  float coarse = grid(warpedUv * 8.0, 0.04);
  float fine = grid(warpedUv * 22.0, 0.015);
  
  float liquid = sin(warpedUv.y * 5.0 + time + sin(warpedUv.x * 4.0 + time * 0.7) * 0.5) * 0.5 + 0.5;
  float surface = smoothstep(0.3, 0.7, liquid);
  
  vec3 bg = vec3(0.02, 0.025, 0.03);
  vec3 gridColor = vec3(0.15, 0.55, 0.45);
  vec3 surfaceColor = vec3(0.28, 0.78, 0.62);
  
  vec3 color = bg;
  color = mix(color, gridColor, coarse * 0.7 + fine * 0.25);
  color = mix(color, surfaceColor, surface * 0.35);
  
  float fade = smoothstep(0.0, 0.15, uv.x) * smoothstep(1.0, 0.85, uv.x) * 
               smoothstep(0.0, 0.15, uv.y) * smoothstep(1.0, 0.85, uv.y);
  color *= 0.7 + fade * 0.3;
  
  gl_FragColor = vec4(color, 1.0);
}
`

export default function LiquidGridScene({ reducedMotion }: EffectSceneProps) {
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
      <color attach="background" args={['#050706']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}