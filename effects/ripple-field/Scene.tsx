'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const COLS = 33
const ROWS = 23
const COUNT = COLS * ROWS

export default function RippleFieldScene({ seed, reducedMotion }: EffectSceneProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const positions = useMemo(() => new Float32Array(COUNT * 3), [])
  const points = useMemo(() => {
    const random = createSeededRandom(seed)
    const result = []

    for (let y = 0; y < ROWS; y += 1) {
      for (let x = 0; x < COLS; x += 1) {
        const px = (x / (COLS - 1) - 0.5) * 6.2 + seededRange(random, -0.018, 0.018)
        const py = (y / (ROWS - 1) - 0.5) * 3.9 + seededRange(random, -0.018, 0.018)
        const distance = Math.hypot(px, py)
        const angle = Math.atan2(py, px)
        result.push({ x: px, y: py, distance, angle })
      }
    }

    return result
  }, [seed])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0.45 : clock.elapsedTime * 1.6

    for (let index = 0; index < COUNT; index += 1) {
      const point = points[index]
      const wave = Math.sin(point.distance * 5.1 - time) * Math.exp(point.distance * -0.34)
      const shift = wave * 0.19
      const offset = index * 3

      positions[offset] = point.x + Math.cos(point.angle) * shift
      positions[offset + 1] = point.y + Math.sin(point.angle) * shift
      positions[offset + 2] = wave * 0.22
    }

    const attribute = geometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#071014']} />
      <points frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#83d5ff" size={0.045} sizeAttenuation transparent opacity={0.92} depthWrite={false} />
      </points>
      <mesh>
        <ringGeometry args={[0.08, 0.085, 48]} />
        <meshBasicMaterial color="#e6fbff" transparent opacity={0.7} />
      </mesh>
    </>
  )
}
