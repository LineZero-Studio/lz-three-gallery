'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { EffectSceneProps } from '../types'

const HINGE_COUNT = 72

interface Hinge {
  x: number
  y: number
  angle: number
  length: number
  phase: number
}

function makeHinges() {
  return Array.from({ length: HINGE_COUNT }, (_, index) => {
    const column = index % 12
    const row = Math.floor(index / 12)
    return {
      x: (column - 5.5) * 0.34,
      y: (row - 2.5) * 0.34,
      angle: (index % 4) * Math.PI * 0.25,
      length: 0.16 + ((index + row) % 3) * 0.035,
      phase: index * 0.37,
    }
  })
}

export default function HingeFieldScene({ reducedMotion }: EffectSceneProps) {
  const { pointer } = useThree()
  const hinges = useMemo(makeHinges, [])
  const lineRef = useRef<THREE.LineSegments>(null)
  const positions = useMemo(() => new Float32Array(HINGE_COUNT * 6), [])
  const geometry = useMemo(() => {
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return lineGeometry
  }, [positions])
  const material = useMemo(() => new THREE.LineBasicMaterial({ color: '#f3efe2', transparent: true, opacity: 0.82 }), [])

  useFrame((state) => {
    const time = reducedMotion ? 0 : state.clock.elapsedTime
    const cursorX = pointer.x * 2.2
    const cursorY = pointer.y * 1.35

    hinges.forEach((hinge, index) => {
      const dx = cursorX - hinge.x
      const dy = cursorY - hinge.y
      const influence = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 1.05)
      const target = Math.atan2(dy, dx)
      const breath = Math.sin(time * 0.42 + hinge.phase) * 0.12
      const angle = hinge.angle * (1 - influence) + target * influence + breath
      const base = index * 6
      positions[base] = hinge.x
      positions[base + 1] = hinge.y
      positions[base + 2] = 0
      positions[base + 3] = hinge.x + Math.cos(angle) * hinge.length
      positions[base + 4] = hinge.y + Math.sin(angle) * hinge.length
      positions[base + 5] = 0
    })

    const attribute = geometry.getAttribute('position') as THREE.BufferAttribute
    attribute.needsUpdate = true
    if (lineRef.current) lineRef.current.rotation.z = Math.sin(time * 0.08) * 0.018
  })

  return (
    <>
      <color attach="background" args={['#0c0b09']} />
      <group>
        <mesh position={[0, 0, -0.04]}>
          <planeGeometry args={[4.7, 2.7]} />
          <meshBasicMaterial color="#221d17" transparent opacity={0.62} />
        </mesh>
        <lineSegments ref={lineRef} geometry={geometry} material={material} />
      </group>
    </>
  )
}
