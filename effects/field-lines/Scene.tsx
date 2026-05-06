'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const STROKE_COUNT = 180

function writeStroke(positions: Float32Array, index: number, x: number, y: number, z: number, angle: number, length: number) {
  const offset = index * 6
  const dx = Math.cos(angle) * length * 0.5
  const dy = Math.sin(angle) * length * 0.5
  positions[offset] = x - dx
  positions[offset + 1] = y - dy
  positions[offset + 2] = z
  positions[offset + 3] = x + dx
  positions[offset + 4] = y + dy
  positions[offset + 5] = z
}

export default function FieldLinesScene({ seed, reducedMotion }: EffectSceneProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const outerRingRef = useRef<THREE.Mesh>(null)
  const { pointer, viewport } = useThree()
  const positions = useMemo(() => new Float32Array(STROKE_COUNT * 6), [])
  const strokes = useMemo(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: STROKE_COUNT }, () => ({
      x: seededRange(random, -3.8, 3.8),
      y: seededRange(random, -2.2, 2.2),
      z: seededRange(random, -0.4, 0.4),
      phase: seededRange(random, 0, Math.PI * 2),
      bias: seededRange(random, -0.35, 0.35),
    }))
  }, [seed])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime
    const targetX = pointer.x * viewport.width * 0.45
    const targetY = pointer.y * viewport.height * 0.45

    if (ringRef.current) ringRef.current.position.set(targetX, targetY, 0)
    if (outerRingRef.current) outerRingRef.current.position.set(targetX, targetY, 0)

    for (let index = 0; index < STROKE_COUNT; index += 1) {
      const stroke = strokes[index]
      const dx = stroke.x - targetX
      const dy = stroke.y - targetY
      const distance = Math.hypot(dx, dy) + 0.001
      const angle = Math.atan2(dy, dx) + Math.PI / 2 + stroke.bias + Math.sin(time * 0.32 + stroke.phase) * 0.08
      const pull = Math.min(0.26, 0.6 / (distance + 1.2))
      const x = stroke.x - dx * pull
      const y = stroke.y - dy * pull
      const length = 0.1 + Math.min(0.18, 0.45 / (distance + 0.5))

      writeStroke(positions, index, x, y, stroke.z, angle, length)
    }

    const attribute = geometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#05070b']} />
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#b8eaff" transparent opacity={0.78} depthWrite={false} />
      </lineSegments>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.1, 0.104, 44]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.74} />
      </mesh>
      <mesh ref={outerRingRef}>
        <ringGeometry args={[0.24, 0.244, 44]} />
        <meshBasicMaterial color="#4ba7ff" transparent opacity={0.32} />
      </mesh>
    </>
  )
}
