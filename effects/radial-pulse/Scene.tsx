'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { EffectSceneProps } from '../types'

const RING_COUNT = 11

export default function RadialPulseScene({ reducedMotion }: EffectSceneProps) {
  const ringRefs = useRef<Array<THREE.Mesh | null>>([])
  const materialRefs = useRef<Array<THREE.MeshBasicMaterial | null>>([])
  const offsets = useMemo(() => Array.from({ length: RING_COUNT }, (_, index) => index / RING_COUNT), [])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0.12 : clock.elapsedTime * 0.2

    for (let index = 0; index < RING_COUNT; index += 1) {
      const progress = (time + offsets[index]) % 1
      const radius = 0.18 + progress * 4.4
      const mesh = ringRefs.current[index]
      const material = materialRefs.current[index]

      if (mesh) mesh.scale.setScalar(radius)
      if (material) material.opacity = Math.max(0, 1 - progress) * 0.86
    }
  })

  return (
    <>
      <color attach="background" args={['#050505']} />
      {offsets.map((_, index) => (
        <mesh
          key={index}
          ref={(node) => {
            ringRefs.current[index] = node
          }}
        >
          <ringGeometry args={[0.992, 1, 128]} />
          <meshBasicMaterial
            ref={(node) => {
              materialRefs.current[index] = node
            }}
            color="#f4f0e8"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
      <mesh>
        <circleGeometry args={[0.045, 48]} />
        <meshBasicMaterial color="#f4f0e8" />
      </mesh>
    </>
  )
}
