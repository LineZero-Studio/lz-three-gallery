'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const POINT_COUNT = 220

export default function CursorGravityScene({ seed, reducedMotion }: EffectSceneProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const targetRef = useRef<THREE.Mesh>(null)
  const positions = useMemo(() => new Float32Array(POINT_COUNT * 3), [])
  const points = useMemo(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: POINT_COUNT }, () => ({
      x: seededRange(random, -3.8, 3.8),
      y: seededRange(random, -2.2, 2.2),
      z: seededRange(random, -0.8, 0.8),
      phase: seededRange(random, 0, Math.PI * 2),
      weight: seededRange(random, 0.18, 0.72),
    }))
  }, [seed])
  const { pointer, viewport } = useThree()

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime
    const targetX = pointer.x * viewport.width * 0.5
    const targetY = pointer.y * viewport.height * 0.5

    if (targetRef.current) {
      targetRef.current.position.set(targetX, targetY, 0)
    }

    for (let index = 0; index < POINT_COUNT; index += 1) {
      const point = points[index]
      const dx = targetX - point.x
      const dy = targetY - point.y
      const distance = Math.hypot(dx, dy) + 0.001
      const pull = reducedMotion ? 0 : Math.min(0.9, point.weight / (distance * distance + 0.45))
      const offset = index * 3

      positions[offset] = point.x + dx * pull + Math.sin(time * 0.25 + point.phase) * 0.018
      positions[offset + 1] = point.y + dy * pull + Math.cos(time * 0.22 + point.phase) * 0.018
      positions[offset + 2] = point.z + pull * 1.2
    }

    const attribute = geometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#080710']} />
      <points frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffdf7a" size={0.052} sizeAttenuation transparent opacity={0.92} depthWrite={false} />
      </points>
      <mesh ref={targetRef}>
        <ringGeometry args={[0.12, 0.125, 40]} />
        <meshBasicMaterial color="#ff6b9a" transparent opacity={0.8} />
      </mesh>
    </>
  )
}
