'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const PLANE_COUNT = 18

export default function FeedbackPlanesScene({ seed, reducedMotion }: EffectSceneProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const planes = useMemo(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: PLANE_COUNT }, (_, index) => ({
      x: seededRange(random, -1.8, 1.8),
      y: seededRange(random, -1.4, 1.4),
      z: index / PLANE_COUNT * -8,
      width: seededRange(random, 1.8, 3.2),
      height: seededRange(random, 0.8, 1.6),
      opacity: seededRange(random, 0.28, 0.58),
      phase: seededRange(random, 0, 1),
      speed: seededRange(random, 0.18, 0.42),
    }))
  }, [seed])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime

    for (let index = 0; index < PLANE_COUNT; index += 1) {
      const plane = planes[index]
      const z = plane.z + (time * plane.speed) % -8
      const wrappedZ = 4 - ((4 - z + 8) % 8)
      const opacity = plane.opacity * (1 - Math.abs(wrappedZ) / 6)

      dummy.position.set(plane.x, plane.y, wrappedZ)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.set(plane.width, plane.height, 1)
      dummy.updateMatrix()
      meshRef.current?.setMatrixAt(index, dummy.matrix)

      const color = new THREE.Color()
      color.setHSL(0.45 + index * 0.015, 0.68, 0.72)
      meshRef.current?.setColorAt(index, color)
    }

    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true
      if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
    }
  })

  return (
    <>
      <color attach="background" args={['#08080a']} />
      <instancedMesh ref={meshRef} args={[undefined, undefined, PLANE_COUNT]} frustumCulled={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent opacity={0.4} depthWrite={false} side={THREE.DoubleSide} />
      </instancedMesh>
    </>
  )
}