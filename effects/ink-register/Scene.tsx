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

float hash(float value) {
  return fract(sin(value * 41.31 + uSeed * 0.00017) * 43758.5453123);
}

float bars(vec2 uv, float offset, float phase) {
  float columns = 22.0;
  float id = floor((uv.x + offset) * columns);
  float localX = fract((uv.x + offset) * columns);
  float speed = mix(0.035, 0.13, hash(id + phase));
  float y = fract(uv.y + uTime * speed + hash(id + 7.0 + phase));
  float dash = smoothstep(0.10, 0.23, y) * (1.0 - smoothstep(0.54, 0.70, y));
  float column = smoothstep(0.08, 0.17, localX) * (1.0 - smoothstep(0.78, 0.93, localX));
  float bite = step(0.44 + hash(id + 9.0) * 0.38, fract(uv.y * 15.0 + hash(id)));
  return dash * column * (0.46 + bite * 0.54);
}

void main() {
  vec2 uv = vUv;
  float paperNoise = hash(floor(uv.x * 80.0) + floor(uv.y * 56.0) * 31.0);
  float cyan = bars(uv + vec2(0.006, -0.012), -0.004, 2.0);
  float magenta = bars(uv + vec2(-0.010, 0.006), 0.006, 11.0);
  float black = bars(uv, 0.0, 19.0);
  float registerMark = (1.0 - smoothstep(0.002, 0.006, abs(uv.x - 0.08))) * step(0.08, uv.y) * (1.0 - step(0.92, uv.y));
  registerMark += (1.0 - smoothstep(0.002, 0.006, abs(uv.y - 0.12))) * step(0.04, uv.x) * (1.0 - step(0.14, uv.x));

  vec3 paper = vec3(0.93, 0.82, 0.62) * (0.94 + paperNoise * 0.06);
  vec3 color = paper;
  color = mix(color, vec3(0.02, 0.12, 0.16), cyan * 0.58);
  color = mix(color, vec3(0.84, 0.05, 0.10), magenta * 0.56);
  color = mix(color, vec3(0.035, 0.032, 0.028), black * 0.78 + registerMark * 0.7);
  gl_FragColor = vec4(color, 1.0);
}
`

export default function InkRegisterScene({ seed, reducedMotion }: EffectSceneProps) {
  const { viewport } = useThree()
  const seedValue = useMemo(() => hashSeed(seed), [seed])
  const uniforms = useRef({
    uTime: { value: 0 },
    uSeed: { value: seedValue },
  })

  useFrame((_, delta) => {
    uniforms.current.uSeed.value = seedValue
    if (reducedMotion) return
    uniforms.current.uTime.value += delta
  })

  return (
    <>
      <color attach="background" args={['#ead0a0']} />
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}
