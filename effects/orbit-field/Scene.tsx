'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const POINT_COUNT = 160

export default function OrbitFieldScene({ seed, reducedMotion }: EffectSceneProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { pointer, viewport } = useThree()
  const positions = useMemo(() => new Float32Array(POINT_COUNT * 3), [])
  const points = useMemo(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: POINT_COUNT }, (_, index) => ({
      ring: index % 5,
      angle: (index / POINT_COUNT) * Math.PI * 2 + seededRange(random, -0.05, 0.05),
      radius: 0.42 + (index % 5) * 0.42 + seededRange(random, -0.04, 0.04),
      speed: seededRange(random, 0.12, 0.32) * (index % 2 === 0 ? 1 : -1),
      phase: seededRange(random, 0, Math.PI * 2),
    }))
  }, [seed])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime
    const targetX = pointer.x * viewport.width * 0.24
    const targetY = pointer.y * viewport.height * 0.24

    if (groupRef.current) groupRef.current.position.set(targetX, targetY, 0)

    for (let index = 0; index < POINT_COUNT; index += 1) {
      const point = points[index]
      const angle = point.angle + time * point.speed
      const breathe = Math.sin(time * 0.38 + point.phase) * 0.04
      const offset = index * 3

      positions[offset] = Math.cos(angle) * (point.radius + breathe)
      positions[offset + 1] = Math.sin(angle) * (point.radius + breathe) * 0.62
      positions[offset + 2] = Math.sin(angle + point.phase) * 0.55
    }

    const attribute = geometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#09080b']} />
      <group ref={groupRef}>
        {[0.42, 0.84, 1.26, 1.68, 2.1].map((radius) => (
          <mesh key={radius} scale={[1, 0.62, 1]}>
            <ringGeometry args={[radius, radius + 0.006, 88]} />
            <meshBasicMaterial color="#f2d7a0" transparent opacity={0.22} />
          </mesh>
        ))}
        <points frustumCulled={false}>
          <bufferGeometry ref={geometryRef}>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#ffb84d" size={0.055} sizeAttenuation transparent opacity={0.92} depthWrite={false} />
        </points>
      </group>
    </>
  )
}
