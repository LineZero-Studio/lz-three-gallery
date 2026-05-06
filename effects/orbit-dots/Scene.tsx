'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const DOT_COUNT = 128

export default function OrbitDotsScene({ seed, reducedMotion }: EffectSceneProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const positions = useMemo(() => new Float32Array(DOT_COUNT * 3), [])
  const dots = useMemo(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: DOT_COUNT }, (_, index) => ({
      radius: seededRange(random, 0.8, 3.0),
      phase: (index / DOT_COUNT) * Math.PI * 2 + seededRange(random, -0.08, 0.08),
      speed: seededRange(random, 0.22, 0.55) * (index % 2 === 0 ? 1 : -1),
      flatten: seededRange(random, 0.45, 0.72),
      depthPhase: seededRange(random, 0, Math.PI * 2),
    }))
  }, [seed])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime

    for (let index = 0; index < DOT_COUNT; index += 1) {
      const dot = dots[index]
      const angle = dot.phase + time * dot.speed
      const offset = index * 3

      positions[offset] = Math.cos(angle) * dot.radius
      positions[offset + 1] = Math.sin(angle) * dot.radius * dot.flatten
      positions[offset + 2] = Math.sin(angle + dot.depthPhase) * 1.8
    }

    const attribute = geometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#17120d']} />
      <points frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#f5c85f" size={0.105} sizeAttenuation transparent opacity={0.9} depthWrite={false} />
      </points>
      <mesh>
        <ringGeometry args={[0.12, 0.13, 48]} />
        <meshBasicMaterial color="#fff2b8" transparent opacity={0.5} />
      </mesh>
    </>
  )
}
