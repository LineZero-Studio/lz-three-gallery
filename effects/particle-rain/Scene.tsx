'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const DROP_COUNT = 130

function writeDrop(positions: Float32Array, index: number, x: number, y: number, z: number, length: number) {
  const offset = index * 6
  positions[offset] = x
  positions[offset + 1] = y
  positions[offset + 2] = z
  positions[offset + 3] = x
  positions[offset + 4] = y - length
  positions[offset + 5] = z
}

export default function ParticleRainScene({ seed, reducedMotion }: EffectSceneProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const positions = useMemo(() => new Float32Array(DROP_COUNT * 6), [])
  const drops = useMemo(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: DROP_COUNT }, () => ({
      x: seededRange(random, -4.2, 4.2),
      z: seededRange(random, -4.5, 1.8),
      phase: seededRange(random, 0, 1),
      speed: seededRange(random, 0.05, 0.18),
      length: seededRange(random, 0.12, 0.42),
    }))
  }, [seed])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime

    for (let index = 0; index < DROP_COUNT; index += 1) {
      const drop = drops[index]
      const progress = (drop.phase + time * drop.speed) % 1
      const depthScale = 1 + (1.8 - drop.z) * 0.08
      const y = 3.3 - progress * 6.6

      writeDrop(positions, index, drop.x, y, drop.z, drop.length * depthScale)
    }

    const attribute = geometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#05090d']} />
      <fog attach="fog" args={['#05090d', 3, 9]} />
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#83c7ff" transparent opacity={0.76} fog />
      </lineSegments>
    </>
  )
}
