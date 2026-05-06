'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { fragment, vertex } from '@/components/liquid/Shader'
import type { EffectSceneProps } from '../types'

export default function LiquidScene({ reducedMotion }: EffectSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera, size } = useThree()
  const animationSpeed = 0.15
  const timeRef = useRef(0)
  const scale = useMemo(() => {
    const height = 2 * Math.tan(THREE.MathUtils.degToRad(75) / 2) * 5
    return [height * (size.width / Math.max(size.height, 1)), height, 1] as [number, number, number]
  }, [size.height, size.width])
  const uniforms = useRef({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
    uAmplitude: { value: 0.3 },
    uSpeed: { value: animationSpeed },
    uScale: { value: 0.5 },
    uColor: { value: new THREE.Color('#E6E2DD') },
    uLineWidth: { value: 0.1 },
    uNumContours: { value: 15 },
    uMode: { value: 1.0 },
    uLightIntensity: { value: 0.15 },
    uWarpStrength: { value: 0.5 },
    uFlowAngle: { value: (116 * Math.PI) / 180 },
    uFlowStrength: { value: 0.6 },
    uAnisotropy: { value: 0.5 },
  })

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return

    camera.position.set(0, 0, 5)
    camera.fov = 75
    camera.updateProjectionMatrix()
  }, [camera])

  useFrame((_, delta) => {
    if (reducedMotion) return

    timeRef.current += delta * animationSpeed
    uniforms.current.uTime.value = timeRef.current
    uniforms.current.uScrollProgress.value = 0
  })

  return (
    <>
      <color attach="background" args={['#000000']} />
      <mesh ref={meshRef} scale={scale}>
        <planeGeometry args={[1, 1, 50, 50]} />
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms.current}
          transparent={false}
          depthWrite
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}
