'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const POINT_COUNT = 64
const LINK_LIMIT = 96

interface PointSpec {
  x: number
  y: number
  z: number
  phase: number
  speed: number
  radius: number
}

interface LinkSpec {
  a: number
  b: number
  distance: number
}

function currentX(point: PointSpec, time: number) {
  return point.x + Math.sin(time * point.speed + point.phase) * point.radius
}

function currentY(point: PointSpec, time: number) {
  return point.y + Math.cos(time * point.speed * 0.8 + point.phase) * point.radius * 0.7
}

export default function ConstellationScene({ seed, reducedMotion }: EffectSceneProps) {
  const pointGeometryRef = useRef<THREE.BufferGeometry>(null)
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null)
  const pointPositions = useMemo(() => new Float32Array(POINT_COUNT * 3), [])
  const linePositions = useMemo(() => new Float32Array(LINK_LIMIT * 6), [])
  const points = useMemo<PointSpec[]>(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: POINT_COUNT }, () => ({
      x: seededRange(random, -3.6, 3.6),
      y: seededRange(random, -2.2, 2.2),
      z: seededRange(random, -1.2, 1.2),
      phase: seededRange(random, 0, Math.PI * 2),
      speed: seededRange(random, 0.1, 0.32),
      radius: seededRange(random, 0.018, 0.08),
    }))
  }, [seed])
  const links = useMemo<LinkSpec[]>(() => {
    const result: LinkSpec[] = []

    for (let a = 0; a < POINT_COUNT; a += 1) {
      for (let b = a + 1; b < POINT_COUNT; b += 1) {
        const dx = points[a].x - points[b].x
        const dy = points[a].y - points[b].y
        const dz = points[a].z - points[b].z
        const distance = Math.hypot(dx, dy, dz)

        if (distance < 1.22) result.push({ a, b, distance })
      }
    }

    result.sort((left, right) => left.distance - right.distance)
    return result.slice(0, LINK_LIMIT)
  }, [points])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime

    for (let index = 0; index < POINT_COUNT; index += 1) {
      const point = points[index]
      const offset = index * 3

      pointPositions[offset] = currentX(point, time)
      pointPositions[offset + 1] = currentY(point, time)
      pointPositions[offset + 2] = point.z
    }

    for (let index = 0; index < LINK_LIMIT; index += 1) {
      const offset = index * 6
      const link = links[index]

      if (!link) {
        linePositions.fill(0, offset, offset + 6)
        continue
      }

      const aOffset = link.a * 3
      const bOffset = link.b * 3
      linePositions[offset] = pointPositions[aOffset]
      linePositions[offset + 1] = pointPositions[aOffset + 1]
      linePositions[offset + 2] = pointPositions[aOffset + 2]
      linePositions[offset + 3] = pointPositions[bOffset]
      linePositions[offset + 4] = pointPositions[bOffset + 1]
      linePositions[offset + 5] = pointPositions[bOffset + 2]
    }

    const pointAttribute = pointGeometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    const lineAttribute = lineGeometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (pointAttribute) pointAttribute.needsUpdate = true
    if (lineAttribute) lineAttribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#070711']} />
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={lineGeometryRef}>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#4e6fff" transparent opacity={0.34} />
      </lineSegments>
      <points frustumCulled={false}>
        <bufferGeometry ref={pointGeometryRef}>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffe6a3" size={0.075} sizeAttenuation transparent opacity={0.95} depthWrite={false} />
      </points>
    </>
  )
}
