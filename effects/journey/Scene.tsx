'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import type { EffectSceneProps } from '../types'

export default function JourneyScene({ reducedMotion }: EffectSceneProps) {
  const planeRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!planeRef.current || reducedMotion) return

    const time = clock.elapsedTime
    planeRef.current.position.x = Math.sin(time * 0.35) * 0.35
    planeRef.current.rotation.z = Math.sin(time * 0.5) * 0.08
  })

  return (
    <>
      <color attach="background" args={['#8bbfd4']} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <mesh position={[0, -1.65, -2.4]} rotation={[-0.18, 0, 0]}>
        <planeGeometry args={[18, 4]} />
        <meshBasicMaterial color="#5f8790" />
      </mesh>
      <group ref={planeRef} position={[0, 0.1, 0]} scale={[0.8, 0.8, 0.8]}>
        <mesh>
          <boxGeometry args={[0.28, 0.14, 1.2]} />
          <meshStandardMaterial color="#f4f0df" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[2.2, 0.04, 0.52]} />
          <meshStandardMaterial color="#eee2cc" />
        </mesh>
        <mesh position={[0, 0.22, -0.42]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.78, 0.035, 0.28]} />
          <meshStandardMaterial color="#eee2cc" />
        </mesh>
      </group>
      {[[-3.2, 1.5, -3.4], [2.5, 1.2, -2.8], [0.8, 2.0, -4.2]].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]} scale={[1.5, 0.35, 1]}>
          <sphereGeometry args={[1, 24, 12]} />
          <meshBasicMaterial color="#dbeef3" transparent opacity={0.68} />
        </mesh>
      ))}
    </>
  )
}
