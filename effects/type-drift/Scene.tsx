'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const FRAGMENTS = [
  'void', 'drift', 'null', 'phase', 'drift', 'void',
  'null', 'void', 'phase', 'null', 'drift', 'void',
]

const FRAGMENT_COUNT = FRAGMENTS.length

function TextFragment({ position, opacity, scale }: { position: [number, number, number]; opacity: number; scale: number }) {
  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 0.5]} />
      <meshBasicMaterial transparent opacity={opacity} color="#c8ffea" depthWrite={false} />
    </mesh>
  )
}

export default function TypeDriftScene({ seed, reducedMotion }: EffectSceneProps) {
  const { viewport } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const fragments = useMemo(() => {
    const random = createSeededRandom(seed)
    return FRAGMENTS.map((text, index) => ({
      text,
      x: seededRange(random, -viewport.width * 0.35, viewport.width * 0.35),
      y: seededRange(random, -viewport.height * 0.35, viewport.height * 0.35),
      z: seededRange(random, -2, 2),
      phase: seededRange(random, 0, Math.PI * 2),
      speedX: seededRange(random, 0.08, 0.18),
      speedY: seededRange(random, 0.06, 0.14),
      baseScale: seededRange(random, 0.28, 0.52),
    }))
  }, [seed, viewport.width, viewport.height])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime

    if (!groupRef.current) return

    groupRef.current.children.forEach((child, index) => {
      const frag = fragments[index]
      const driftX = Math.sin(time * frag.speedX + frag.phase) * 0.35
      const driftY = Math.cos(time * frag.speedY + frag.phase * 0.7) * 0.25

      child.position.x = frag.x + driftX
      child.position.y = frag.y + driftY
      child.position.z = frag.z

      const opacity = 0.42 + Math.sin(time * 0.3 + frag.phase) * 0.28
      const scale = frag.baseScale + Math.sin(time * 0.25 + frag.phase) * 0.08

      const mesh = child as THREE.Mesh
      if (mesh.material) {
        const mat = mesh.material as THREE.MeshBasicMaterial
        mat.opacity = Math.max(0.1, Math.min(0.85, opacity))
      }
      child.scale.setScalar(scale)
    })
  })

  return (
    <>
      <color attach="background" args={['#0a0b0d']} />
      <group ref={groupRef}>
        {fragments.map((frag, index) => (
          <mesh key={index} position={[frag.x, frag.y, frag.z]}>
            <planeGeometry args={[1, 0.5]} />
            <meshBasicMaterial transparent opacity={0.5} color="#c8ffea" depthWrite={false} />
          </mesh>
        ))}
      </group>
    </>
  )
}