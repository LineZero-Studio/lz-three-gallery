'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const SEGMENT_LIMIT = 190

interface BranchNode {
  x: number
  y: number
  angle: number
  depth: number
  energy: number
}

interface TraceSegment {
  x1: number
  y1: number
  x2: number
  y2: number
  z: number
  birth: number
}

function angleDelta(from: number, to: number) {
  return Math.atan2(Math.sin(to - from), Math.cos(to - from))
}

function createTrace(seed: string) {
  const random = createSeededRandom(seed)
  const active: BranchNode[] = [{ x: 0, y: -1.82, angle: Math.PI / 2, depth: 0, energy: 1 }]
  const segments: TraceSegment[] = []

  while (segments.length < SEGMENT_LIMIT && active.length > 0) {
    const node = active.shift()
    if (!node) break

    const upwardBias = Math.PI / 2 + Math.sin(node.x * 1.4) * 0.18
    const angle =
      node.angle +
      angleDelta(node.angle, upwardBias) * (0.08 + node.energy * 0.08) +
      seededRange(random, -0.32, 0.32) * Math.max(0.35, node.energy)
    const length = seededRange(random, 0.1, 0.22) * (0.62 + node.energy * 0.42)
    const x2 = node.x + Math.cos(angle) * length
    const y2 = node.y + Math.sin(angle) * length

    if (Math.abs(x2) > 3.55 || Math.abs(y2) > 2.28) continue

    segments.push({
      x1: node.x,
      y1: node.y,
      x2,
      y2,
      z: seededRange(random, -0.06, 0.06),
      birth: segments.length / SEGMENT_LIMIT,
    })

    const nextEnergy = Math.max(0.2, node.energy * seededRange(random, 0.92, 0.985))
    active.push({ x: x2, y: y2, angle, depth: node.depth + 1, energy: nextEnergy })

    const branchChance = 0.26 + node.energy * 0.2 - node.depth * 0.003
    if (random() < branchChance && segments.length < SEGMENT_LIMIT) {
      const side = random() > 0.5 ? 1 : -1
      active.push({
        x: x2,
        y: y2,
        angle: angle + side * seededRange(random, 0.42, 0.78),
        depth: node.depth + 4,
        energy: nextEnergy * seededRange(random, 0.66, 0.84),
      })
    }
  }

  return segments
}

export default function HyphaeTraceScene({ seed, reducedMotion }: EffectSceneProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const segments = useMemo(() => createTrace(seed), [seed])
  const positions = useMemo(() => new Float32Array(segments.length * 6), [segments.length])

  useFrame(({ clock }) => {
    const reveal = reducedMotion ? 1 : Math.min(1, clock.elapsedTime * 0.12)

    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index]
      const progress = Math.min(1, Math.max(0, (reveal - segment.birth) * 18))
      const offset = index * 6
      positions[offset] = segment.x1
      positions[offset + 1] = segment.y1
      positions[offset + 2] = segment.z
      positions[offset + 3] = segment.x1 + (segment.x2 - segment.x1) * progress
      positions[offset + 4] = segment.y1 + (segment.y2 - segment.y1) * progress
      positions[offset + 5] = segment.z
    }

    const attribute = geometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#070604']} />
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#f0d58a" transparent opacity={0.82} depthWrite={false} />
      </lineSegments>
    </>
  )
}
