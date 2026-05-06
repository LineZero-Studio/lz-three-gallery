'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createSeededRandom, seededRange } from '../shared/random'
import type { EffectSceneProps } from '../types'

const VEIN_COUNT = 96

interface VeinPoint {
  x: number
  y: number
  phase: number
}

function writeLine(positions: Float32Array, lineIndex: number, x1: number, y1: number, x2: number, y2: number) {
  const offset = lineIndex * 6
  positions[offset] = x1
  positions[offset + 1] = y1
  positions[offset + 2] = 0
  positions[offset + 3] = x2
  positions[offset + 4] = y2
  positions[offset + 5] = 0
}

export default function VeinMapScene({ seed, reducedMotion }: EffectSceneProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const sourceRef = useRef<THREE.Mesh>(null)
  const { pointer, viewport } = useThree()
  const positions = useMemo(() => new Float32Array((VEIN_COUNT * 2 + 1) * 6), [])
  const veins = useMemo<VeinPoint[]>(() => {
    const random = createSeededRandom(seed)
    return Array.from({ length: VEIN_COUNT }, () => {
      const y = seededRange(random, -1.75, 1.85)
      const width = Math.pow(Math.max(0, 1 - Math.abs(y) / 2.0), 0.65) * 1.85
      const side = random() > 0.5 ? 1 : -1
      return {
        x: side * seededRange(random, width * 0.25, Math.max(width, 0.26)),
        y,
        phase: seededRange(random, 0, Math.PI * 2),
      }
    })
  }, [seed])

  useFrame(({ clock }) => {
    const time = reducedMotion ? 0 : clock.elapsedTime
    const sourceX = pointer.x * viewport.width * 0.18
    const sourceY = pointer.y * viewport.height * 0.18 - 0.15

    if (sourceRef.current) sourceRef.current.position.set(sourceX, sourceY, 0)

    writeLine(positions, 0, sourceX, -2.0, sourceX, 2.0)

    for (let index = 0; index < veins.length; index += 1) {
      const vein = veins[index]
      const pulse = Math.sin(time * 0.45 + vein.phase) * 0.035
      const midX = sourceX * 0.55 + vein.x * 0.28
      const midY = sourceY * 0.35 + vein.y * 0.55 + pulse
      const endpointX = vein.x + pulse * Math.sign(vein.x)
      const endpointY = vein.y
      const lineIndex = index * 2 + 1
      writeLine(positions, lineIndex, sourceX, sourceY, midX, midY)
      writeLine(positions, lineIndex + 1, midX, midY, endpointX, endpointY)
    }

    const attribute = geometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={['#071008']} />
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#92f3a4" transparent opacity={0.68} depthWrite={false} />
      </lineSegments>
      <mesh ref={sourceRef}>
        <ringGeometry args={[0.11, 0.115, 36]} />
        <meshBasicMaterial color="#f4ffd6" transparent opacity={0.78} />
      </mesh>
    </>
  )
}
