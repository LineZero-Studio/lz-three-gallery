'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const CARD_COUNT = 28
const DEPTH = 12

export default function DepthCardsScene({ seed, reducedMotion }: EffectSceneProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const cards = useMemo(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: CARD_COUNT }, (_, index) => ({
      x: seededRange(random, -3.2, 3.2),
      y: seededRange(random, -1.8, 1.8),
      z: (index / CARD_COUNT) * DEPTH,
      width: seededRange(random, 0.35, 0.9),
      height: seededRange(random, 0.16, 0.46),
      tilt: seededRange(random, -0.18, 0.18),
      speed: seededRange(random, 0.35, 0.7),
    }))
  }, [seed])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime

    for (let index = 0; index < CARD_COUNT; index += 1) {
      const card = cards[index]
      const z = 2 - ((card.z + time * card.speed) % DEPTH)
      const depthProgress = 1 - (z + DEPTH - 2) / DEPTH
      const scale = 0.7 + depthProgress * 1.3

      dummy.position.set(card.x * scale * 0.55, card.y * scale * 0.5, z)
      dummy.rotation.set(0, 0, card.tilt)
      dummy.scale.set(card.width * scale, card.height * scale, 1)
      dummy.updateMatrix()
      meshRef.current?.setMatrixAt(index, dummy.matrix)
    }

    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#10100d']} />
      <fog attach="fog" args={['#10100d', 4, 14]} />
      <instancedMesh ref={meshRef} args={[undefined, undefined, CARD_COUNT]} frustumCulled={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#f2d27d" transparent opacity={0.68} depthWrite={false} fog />
      </instancedMesh>
    </>
  )
}
