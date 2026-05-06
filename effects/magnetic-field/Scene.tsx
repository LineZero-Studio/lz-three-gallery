'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const POINT_COUNT = 180

export default function MagneticFieldScene({ seed, reducedMotion }: EffectSceneProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const positions = useMemo(() => new Float32Array(POINT_COUNT * 3), [])
  const points = useMemo(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: POINT_COUNT }, () => ({
      x: seededRange(random, -3.2, 3.2),
      y: seededRange(random, -2.0, 2.0),
      z: seededRange(random, -0.6, 0.6),
      originX: seededRange(random, -3.2, 3.2),
      originY: seededRange(random, -2.0, 2.0),
      radius: seededRange(random, 0.04, 0.12),
      phase: seededRange(random, 0, Math.PI * 2),
    }))
  }, [seed])
  const { pointer, viewport } = useThree()

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime
    const targetX = pointer.x * viewport.width * 0.45
    const targetY = pointer.y * viewport.height * 0.45

    for (let index = 0; index < POINT_COUNT; index += 1) {
      const point = points[index]
      const toTargetX = targetX - point.originX
      const toTargetY = targetY - point.originY
      const dist = Math.hypot(toTargetX, toTargetY) + 0.001
      const pull = reducedMotion ? 0 : Math.min(0.85, 1.8 / (dist * dist + 0.8))
      
      const fieldX = point.originX + toTargetX * pull + Math.sin(time * 0.35 + point.phase) * 0.015
      const fieldY = point.originY + toTargetY * pull + Math.cos(time * 0.28 + point.phase) * 0.015
      
      const offset = index * 3
      positions[offset] = fieldX
      positions[offset + 1] = fieldY
      positions[offset + 2] = point.z + pull * 0.9
    }

    const attribute = geometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#07080c']} />
      <points frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#a8d9ff" size={0.045} sizeAttenuation transparent opacity={0.88} depthWrite={false} />
      </points>
      <mesh position={[pointer.x * viewport.width * 0.45, pointer.y * viewport.height * 0.45, 0]}>
        <ringGeometry args={[0.10, 0.102, 36]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
      <mesh position={[pointer.x * viewport.width * 0.45, pointer.y * viewport.height * 0.45, 0]}>
        <ringGeometry args={[0.16, 0.162, 36]} />
        <meshBasicMaterial color="#4a9eff" transparent opacity={0.25} />
      </mesh>
    </>
  )
}