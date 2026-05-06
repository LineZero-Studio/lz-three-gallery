'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { EffectSceneProps } from '../types'

const columns = [
  { x: -1.25, width: 0.68, height: 2.7 },
  { x: 0, width: 0.92, height: 2.15 },
  { x: 1.28, width: 0.56, height: 2.92 },
]

const colors = ['#111111', '#f4eee0', '#d73a18', '#173b61']

function Plane({ color, position, scale, opacity = 1 }: { color: string; position: [number, number, number]; scale: [number, number, number]; opacity?: number }) {
  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  )
}

export default function SliceLockScene({ reducedMotion }: EffectSceneProps) {
  const groups = useRef<Array<THREE.Group | null>>([])
  const offsets = useMemo(() => columns.map((_, index) => index * 0.41), [])

  useFrame((state) => {
    const time = reducedMotion ? 0 : state.clock.elapsedTime
    groups.current.forEach((group, index) => {
      if (!group) return
      group.position.x = Math.sin(time * (0.18 + index * 0.05) + offsets[index]) * 0.18
      group.position.y = Math.sin(time * 0.13 + index) * 0.035
    })
  })

  return (
    <>
      <color attach="background" args={['#e8ddc8']} />
      <group>
        <Plane color="#141414" position={[0, 0, -0.08]} scale={[4.5, 3.15, 1]} opacity={0.08} />
        {columns.map((column, columnIndex) => (
          <group key={column.x} position={[column.x, 0, 0]}>
            <Plane color="#f4eee0" position={[0, 0, -0.03]} scale={[column.width + 0.08, column.height + 0.08, 1]} />
            <group
              ref={(group) => {
                groups.current[columnIndex] = group
              }}
            >
              {Array.from({ length: 8 }, (_, bandIndex) => {
                const y = -column.height * 0.5 + bandIndex * (column.height / 7)
                const color = colors[(bandIndex + columnIndex) % colors.length]
                const height = 0.13 + ((bandIndex + columnIndex) % 3) * 0.07
                return <Plane key={bandIndex} color={color} position={[0, y, 0.01]} scale={[column.width, height, 1]} opacity={0.88} />
              })}
            </group>
            <Plane color="#e8ddc8" position={[0, column.height * 0.5 + 0.13, 0.04]} scale={[column.width + 0.22, 0.26, 1]} />
            <Plane color="#e8ddc8" position={[0, -column.height * 0.5 - 0.13, 0.04]} scale={[column.width + 0.22, 0.26, 1]} />
            <Plane color="#e8ddc8" position={[-column.width * 0.5 - 0.08, 0, 0.04]} scale={[0.16, column.height + 0.32, 1]} />
            <Plane color="#e8ddc8" position={[column.width * 0.5 + 0.08, 0, 0.04]} scale={[0.16, column.height + 0.32, 1]} />
            <Plane color="#111111" position={[0, column.height * 0.5, 0.06]} scale={[column.width + 0.04, 0.026, 1]} opacity={0.8} />
            <Plane color="#111111" position={[0, -column.height * 0.5, 0.06]} scale={[column.width + 0.04, 0.026, 1]} opacity={0.8} />
            <Plane color="#111111" position={[-column.width * 0.5, 0, 0.06]} scale={[0.026, column.height + 0.04, 1]} opacity={0.8} />
            <Plane color="#111111" position={[column.width * 0.5, 0, 0.06]} scale={[0.026, column.height + 0.04, 1]} opacity={0.8} />
          </group>
        ))}
      </group>
    </>
  )
}
