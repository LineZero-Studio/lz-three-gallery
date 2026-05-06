'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'
import type { EffectSceneProps } from '../types'

const SEGMENTS = 34

function Plane({ color, position, scale, opacity = 1 }: { color: string; position: [number, number, number]; scale: [number, number, number]; opacity?: number }) {
  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  )
}

export default function SignalCutScene({ reducedMotion }: EffectSceneProps) {
  const positions = useMemo(() => new Float32Array(SEGMENTS * 3), [])
  const geometry = useMemo(() => {
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return lineGeometry
  }, [positions])
  const material = useMemo(() => new THREE.LineBasicMaterial({ color: '#151515', transparent: true, opacity: 0.9 }), [])
  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material])

  useFrame((state) => {
    const time = reducedMotion ? 0 : state.clock.elapsedTime
    for (let index = 0; index < SEGMENTS; index += 1) {
      const t = index / (SEGMENTS - 1)
      const x = -1.95 + t * 3.9
      const y = Math.sin(t * Math.PI * 4.0 + time * 0.58) * 0.34 + Math.sin(t * Math.PI * 9.0 - time * 0.2) * 0.08
      const base = index * 3
      positions[base] = x
      positions[base + 1] = y
      positions[base + 2] = 0.04
    }
    const attribute = geometry.getAttribute('position') as THREE.BufferAttribute
    attribute.needsUpdate = true
    line.position.y = Math.sin(time * 0.18) * 0.04
  })

  return (
    <>
      <color attach="background" args={['#efe6d0']} />
      <group>
        <Plane color="#151515" opacity={0.82} position={[0, 0.92, 0]} scale={[4.1, 0.035, 1]} />
        <Plane color="#151515" opacity={0.82} position={[0, -0.92, 0]} scale={[4.1, 0.035, 1]} />
        <Plane color="#151515" opacity={0.18} position={[0, 0, -0.04]} scale={[4.15, 1.8, 1]} />
        {Array.from({ length: 12 }, (_, index) => {
          const x = -1.9 + index * 0.345
          const major = index % 3 === 0
          return <Plane key={index} color="#151515" opacity={major ? 0.62 : 0.32} position={[x, -0.92, 0.02]} scale={[0.018, major ? 0.28 : 0.16, 1]} />
        })}
        <primitive object={line} />
        <Plane color="#c7351a" opacity={0.94} position={[-1.2, 0.15, 0.08]} scale={[0.62, 0.34, 1]} />
        <Plane color="#efe6d0" opacity={1} position={[-1.2, 0.15, 0.09]} scale={[0.48, 0.2, 1]} />
        <Plane color="#214c70" opacity={0.94} position={[0.42, -0.18, 0.08]} scale={[0.9, 0.44, 1]} />
        <Plane color="#efe6d0" opacity={1} position={[0.42, -0.18, 0.09]} scale={[0.72, 0.28, 1]} />
        <Plane color="#c7351a" opacity={0.94} position={[1.42, 0.34, 0.08]} scale={[0.46, 0.26, 1]} />
        <Plane color="#151515" opacity={0.75} position={[-1.92, 0, 0.1]} scale={[0.032, 1.82, 1]} />
        <Plane color="#151515" opacity={0.75} position={[1.92, 0, 0.1]} scale={[0.032, 1.82, 1]} />
      </group>
    </>
  )
}
