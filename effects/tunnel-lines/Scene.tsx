'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const RING_COUNT = 24
const DEPTH = 22

function writeSegment(
  positions: Float32Array,
  offset: number,
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
) {
  positions[offset] = ax
  positions[offset + 1] = ay
  positions[offset + 2] = az
  positions[offset + 3] = bx
  positions[offset + 4] = by
  positions[offset + 5] = bz
  return offset + 6
}

export default function TunnelLinesScene({ seed, reducedMotion }: EffectSceneProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const depths = useMemo(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: RING_COUNT }, (_, index) => (index / RING_COUNT) * DEPTH + seededRange(random, -0.18, 0.18))
  }, [seed])
  const skews = useMemo(() => {
    const random = createSeededRandom(`${seed}:skew`)
    return Array.from({ length: RING_COUNT }, () => seededRange(random, -0.28, 0.28))
  }, [seed])
  const positions = useMemo(() => new Float32Array(RING_COUNT * 4 * 2 * 3), [])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime * 2.25
    let offset = 0

    for (let index = 0; index < RING_COUNT; index += 1) {
      const wrapped = (depths[index] + time) % DEPTH
      const near = 1 - wrapped / DEPTH
      const z = 2 - wrapped
      const width = 0.7 + near * 5.2
      const height = 0.46 + near * 3.2
      const skew = skews[index] * near
      const left = -width + skew
      const right = width + skew
      const bottom = -height
      const top = height

      offset = writeSegment(positions, offset, left, bottom, z, right, bottom, z)
      offset = writeSegment(positions, offset, right, bottom, z, right, top, z)
      offset = writeSegment(positions, offset, right, top, z, left, top, z)
      offset = writeSegment(positions, offset, left, top, z, left, bottom, z)
    }

    const attribute = geometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#05040c']} />
      <fog attach="fog" args={['#05040c', 7, 24]} />
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#77f7ff" transparent opacity={0.88} fog />
      </lineSegments>
    </>
  )
}
