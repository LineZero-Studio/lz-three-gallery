'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const POINT_COUNT = 640
const PATH_COUNT = 9

interface Grain {
  path: number
  t: number
  jitter: number
  phase: number
  depth: number
}

export default function SandSplineScene({ seed, reducedMotion }: EffectSceneProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const { viewport } = useThree()
  const positions = useMemo(() => new Float32Array(POINT_COUNT * 3), [])
  const grains = useMemo<Grain[]>(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: POINT_COUNT }, (_, index) => ({
      path: index % PATH_COUNT,
      t: (index % Math.floor(POINT_COUNT / PATH_COUNT)) / Math.floor(POINT_COUNT / PATH_COUNT),
      jitter: seededRange(random, -0.035, 0.035),
      phase: seededRange(random, 0, Math.PI * 2),
      depth: seededRange(random, -0.14, 0.14),
    }))
  }, [seed])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime * 0.22
    const width = viewport.width * 0.84
    const height = viewport.height * 0.5

    for (let index = 0; index < grains.length; index += 1) {
      const grain = grains[index]
      const pathOffset = (grain.path / (PATH_COUNT - 1) - 0.5) * height
      const t = grain.t
      const wave = Math.sin(t * Math.PI * 2 * (1.1 + grain.path * 0.08) + grain.phase + time) * 0.18
      const ripple = Math.sin(t * Math.PI * 6 + time * 1.7 + grain.path) * 0.035
      const offset = index * 3
      positions[offset] = (t - 0.5) * width + grain.jitter * 3
      positions[offset + 1] = pathOffset + wave + ripple + grain.jitter
      positions[offset + 2] = grain.depth
    }

    const attribute = geometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#0b0906']} />
      <points frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#e8c77d" size={0.026} sizeAttenuation transparent opacity={0.86} depthWrite={false} />
      </points>
    </>
  )
}
