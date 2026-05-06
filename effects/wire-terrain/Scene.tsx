'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const COLS = 20
const ROWS = 12
const CROSS_COLUMNS = [0, 6, 13, 19]
const SEGMENT_COUNT = ROWS * (COLS - 1) + CROSS_COLUMNS.length * (ROWS - 1)

function heightAt(x: number, z: number, time: number, offset: number) {
  return (
    Math.sin(x * 1.35 + time * 0.8 + offset) * 0.18 +
    Math.sin(z * 1.7 + x * 0.35 - time * 0.65) * 0.22 +
    Math.cos((x - z) * 0.72 + offset) * 0.12
  )
}

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

export default function WireTerrainScene({ seed, reducedMotion }: EffectSceneProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const positions = useMemo(() => new Float32Array(SEGMENT_COUNT * 6), [])
  const rowOffsets = useMemo(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: ROWS }, () => seededRange(random, -0.9, 0.9))
  }, [seed])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime
    const forward = reducedMotion ? 0 : (time * 0.55) % 0.72
    let offset = 0

    for (let row = 0; row < ROWS; row += 1) {
      const z = (row / (ROWS - 1) - 0.5) * 7.2 + forward

      for (let col = 0; col < COLS - 1; col += 1) {
        const ax = (col / (COLS - 1) - 0.5) * 6.8
        const bx = ((col + 1) / (COLS - 1) - 0.5) * 6.8
        const ay = heightAt(ax, z, time, rowOffsets[row])
        const by = heightAt(bx, z, time, rowOffsets[row])

        offset = writeSegment(positions, offset, ax, ay, z, bx, by, z)
      }
    }

    for (let index = 0; index < CROSS_COLUMNS.length; index += 1) {
      const col = CROSS_COLUMNS[index]
      const x = (col / (COLS - 1) - 0.5) * 6.8

      for (let row = 0; row < ROWS - 1; row += 1) {
        const az = (row / (ROWS - 1) - 0.5) * 7.2 + forward
        const bz = ((row + 1) / (ROWS - 1) - 0.5) * 7.2 + forward
        const ay = heightAt(x, az, time, rowOffsets[row])
        const by = heightAt(x, bz, time, rowOffsets[row + 1])

        offset = writeSegment(positions, offset, x, ay, az, x, by, bz)
      }
    }

    const attribute = geometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#020707']} />
      <fog attach="fog" args={['#020707', 4.2, 10]} />
      <lineSegments rotation={[-1.08, 0, 0]} position={[0, -1.25, 0]} frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#7dffb0" transparent opacity={0.92} fog />
      </lineSegments>
    </>
  )
}
