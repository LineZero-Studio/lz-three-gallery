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

float rectMask(vec2 p, vec2 halfSize) {
  vec2 outside = step(halfSize, abs(p));
  return 1.0 - max(outside.x, outside.y);
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = vUv;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  float time = uTime * 0.18;
  vec2 flow = uv;
  flow.x += sin(uv.y * 7.0 + time * 2.0) * 0.08 + sin(uv.y * 17.0 - time) * 0.018;
  flow.y += cos(uv.x * 6.0 - time * 1.4) * 0.06;
  float liquid = sin(flow.x * 9.0 + time) + sin(flow.y * 12.0 - time * 1.3) + sin((flow.x + flow.y) * 8.0);
  float contour = 1.0 - smoothstep(0.018, 0.046, abs(fract(liquid * 0.36 + time * 0.12) - 0.5));
  float fill = smoothstep(-0.35, 0.8, liquid);
  float slab = rectMask(p + vec2(0.0, 0.02), vec2(0.62 * aspect, 0.28));
  float cut = rectMask(p - vec2(-0.18 * aspect, -0.18), vec2(0.22 * aspect, 0.09));
  float circle = 1.0 - smoothstep(0.28, 0.285, length(p - vec2(0.34 * aspect, 0.16)));
  float mask = clamp(slab - cut + circle, 0.0, 1.0);
  float edge = 1.0 - smoothstep(0.004, 0.018, abs(mask - 0.5));

  vec3 bg = vec3(0.012, 0.012, 0.011);
  vec3 cream = vec3(0.89, 0.86, 0.78);
  vec3 blue = vec3(0.18, 0.55, 0.72);
  vec3 color = bg;
  color = mix(color, cream, mask * (0.18 + fill * 0.2));
  color += blue * contour * mask * 0.86;
  color += cream * edge * 0.48;
  gl_FragColor = vec4(color, 1.0);
}
`

export default function LiquidMaskScene({ reducedMotion }: EffectSceneProps) {
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
      <color attach="background" args={['#030303']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
