'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { hashSeed } from '../shared/random'
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
uniform float uSeed;
uniform vec2 uCursor;
uniform vec2 uResolution;

vec2 fieldFrom(vec2 p, vec2 charge, float strength) {
  vec2 delta = p - charge;
  float r2 = dot(delta, delta) + 0.018;
  return normalize(delta) * strength / r2;
}

float ring(vec2 p, vec2 center, float radius, float width) {
  return 1.0 - smoothstep(width, width * 1.8, abs(length(p - center) - radius));
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = vUv;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  vec2 cursor = vec2(uCursor.x * aspect, uCursor.y);
  float seedShift = fract(uSeed * 0.00013) - 0.5;
  vec2 fixedA = vec2(-0.46 * aspect, 0.22 + seedShift * 0.08);
  vec2 fixedB = vec2(0.48 * aspect, -0.18 - seedShift * 0.08);

  vec2 field = fieldFrom(p, cursor, 0.32) + fieldFrom(p, fixedA, -0.22) + fieldFrom(p, fixedB, 0.18);
  float magnitude = length(field);
  float contour = 1.0 - smoothstep(0.018, 0.034, abs(fract(magnitude * 0.42 - uTime * 0.018) - 0.5));
  float target = ring(p, cursor, 0.13, 0.008) + ring(p, cursor, 0.29, 0.006);
  float anchors = ring(p, fixedA, 0.08, 0.006) + ring(p, fixedB, 0.08, 0.006);
  float glow = smoothstep(0.05, 1.4, magnitude) * 0.62;

  vec3 bg = vec3(0.015, 0.018, 0.028);
  vec3 cyan = vec3(0.20, 0.78, 1.00);
  vec3 amber = vec3(1.00, 0.54, 0.18);
  vec3 paper = vec3(0.92, 0.96, 1.00);
  vec3 color = bg;
  color += cyan * contour * 0.26;
  color = mix(color, amber, glow * 0.36);
  color += paper * target * 0.7 + amber * anchors * 0.38;
  gl_FragColor = vec4(color, 1.0);
}
`

export default function ChargeMapScene({ seed, reducedMotion }: EffectSceneProps) {
  const { viewport, pointer, size } = useThree()
  const seedValue = useMemo(() => hashSeed(seed), [seed])
  const uniforms = useRef({
    uTime: { value: 0 },
    uSeed: { value: seedValue },
    uCursor: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  })

  useFrame((_, delta) => {
    uniforms.current.uSeed.value = seedValue
    uniforms.current.uCursor.value.set(pointer.x * 0.5, pointer.y * 0.5)
    uniforms.current.uResolution.value.set(size.width, size.height)
    if (reducedMotion) return
    uniforms.current.uTime.value += delta
  })

  return (
    <>
      <color attach="background" args={['#040610']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
