'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const ROWS = 22
const SEGMENTS = 28
const LINE_COUNT = ROWS * SEGMENTS

function height(x: number, row: number, time: number, phase: number) {
  return (
    Math.sin(x * 1.7 + row * 0.44 + time * 0.55 + phase) * 0.16 +
    Math.sin(x * 3.4 - time * 0.32 + phase * 0.7) * 0.055
  )
}

function writeSegment(positions: Float32Array, index: number, ax: number, ay: number, bx: number, by: number) {
  const offset = index * 6
  positions[offset] = ax
  positions[offset + 1] = ay
  positions[offset + 2] = 0
  positions[offset + 3] = bx
  positions[offset + 4] = by
  positions[offset + 5] = 0
}

export default function TopoSlicesScene({ seed, reducedMotion }: EffectSceneProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const positions = useMemo(() => new Float32Array(LINE_COUNT * 6), [])
  const rowPhases = useMemo(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: ROWS }, () => seededRange(random, 0, Math.PI * 2))
  }, [seed])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime
    let lineIndex = 0

    for (let row = 0; row < ROWS; row += 1) {
      const baseY = (row / (ROWS - 1) - 0.5) * 4.1
      const phase = rowPhases[row]

      for (let segment = 0; segment < SEGMENTS; segment += 1) {
        const ax = (segment / SEGMENTS - 0.5) * 7.4
        const bx = ((segment + 1) / SEGMENTS - 0.5) * 7.4
        const ay = baseY + height(ax, row, time, phase)
        const by = baseY + height(bx, row, time, phase)
        writeSegment(positions, lineIndex, ax, ay, bx, by)
        lineIndex += 1
      }
    }

    const attribute = geometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#050404']} />
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#e7dcc6" transparent opacity={0.86} />
      </lineSegments>
    </>
  )
}
