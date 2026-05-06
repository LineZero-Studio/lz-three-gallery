import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { cloudVertex, cloudFragment } from './CloudShader'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'

interface VolumeCloudProps {
    scrollProgress: MotionValue<number>
    index: number
    controls: any
}

// Helper function to convert hex color to Vector3
function hexToVector3(hex: string): THREE.Vector3 {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return new THREE.Vector3(r, g, b)
}

export default function VolumeCloud({ scrollProgress, index, controls }: VolumeCloudProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    const { camera } = useThree()
    
    const uniforms = useRef({
        uSunPosition: { value: new THREE.Vector3(15, 18, -25) },
        uTime: { value: 0 },
        uCloudCover: { value: 0.45 },
        uCloudDensity: { value: 0.35 },
        uSkyColor: { value: new THREE.Vector3(0.529, 0.808, 0.922) },
        uCloudColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
        uCloudOffset: { value: new THREE.Vector3(0, 0, 0) },
        uAbsorption: { value: 0.12 },
        uScatteringG: { value: 0.4 },
        uBackScatterG: { value: -0.3 },
        uBackScatterMix: { value: 0.3 },
        uPowderStrength: { value: 1.0 },
        uMultipleScatterSamples: { value: 3.0 },
        uLightStepSize: { value: 2.0 },
        uRayStepSize: { value: 2.5 },
        uMaxLightSamples: { value: 8 },
        uMaxRaySamples: { value: 32 }
    })
    
    useFrame((state) => {
        if (meshRef.current) {
            const scrollValue = scrollProgress.get()
            
            // Update cloud position to follow journey
            // Map scroll 0-1 to journey z range -20 to 50
            const baseZ = -20 + scrollValue * 70
            const zPos = baseZ + (index - 2.5) * 15.0 // Spread clouds around journey
            
            // Update shader uniforms
            uniforms.current.uTime.value = state.clock.elapsedTime
            uniforms.current.uCloudOffset.value.z = zPos
            
            // Update cloud properties from controls
            uniforms.current.uCloudCover.value = controls.cloudCover
            uniforms.current.uCloudDensity.value = controls.cloudDensity
            uniforms.current.uCloudColor.value = hexToVector3(controls.cloudColor)
            uniforms.current.uSkyColor.value = hexToVector3(controls.skyColorCloud)
            
            // Update advanced cloud parameters
            uniforms.current.uAbsorption.value = controls.absorption
            uniforms.current.uScatteringG.value = controls.scatteringG
            uniforms.current.uBackScatterG.value = controls.backScatterG
            uniforms.current.uBackScatterMix.value = controls.backScatterMix
            uniforms.current.uPowderStrength.value = controls.powderStrength
            uniforms.current.uMultipleScatterSamples.value = controls.multipleScatterSamples
            uniforms.current.uLightStepSize.value = controls.lightStepSize
            uniforms.current.uRayStepSize.value = controls.rayStepSize
            uniforms.current.uMaxLightSamples.value = controls.maxLightSamples
            uniforms.current.uMaxRaySamples.value = controls.maxRaySamples
            
            // Update sun position from lighting controls
            uniforms.current.uSunPosition.value.set(
                controls.sunPositionX,
                controls.sunPositionY,
                controls.sunPositionZ
            )
            
            // Slight horizontal variation for more natural distribution
            uniforms.current.uCloudOffset.value.x = Math.sin(index * 2.5 + state.clock.elapsedTime * 0.1) * 10.0
            uniforms.current.uCloudOffset.value.y = 16.0 + Math.sin(index * 1.3) * 2.0
        }
    })
    
    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <boxGeometry args={[80, 17, 60]} />
            <shaderMaterial
                vertexShader={cloudVertex}
                fragmentShader={cloudFragment}
                uniforms={uniforms.current}
                transparent={true}
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    )
}

