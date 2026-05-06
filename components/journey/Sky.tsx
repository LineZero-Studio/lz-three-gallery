import React from 'react'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import VolumeCloud from './VolumeCloud'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'

interface SkyProps {
    scrollProgress: MotionValue<number>
    controls: any
}

export default function Sky({ scrollProgress, controls }: SkyProps) {
    const skyRef = useRef<THREE.Mesh>(null)

    return (
        <>
            {/* Sky gradient using a large sphere */}
            <mesh ref={skyRef} scale={[100, 100, 100]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial 
                    color={controls.Sky.skyColor} 
                    side={THREE.BackSide}
                    fog={false}
                />
            </mesh>
            
            {/* Multiple volume cloud patches positioned along the journey */}
            {[...Array(6)].map((_, i) => (
                <VolumeCloud 
                    key={i} 
                    scrollProgress={scrollProgress} 
                    index={i}
                    controls={controls.Clouds}
                />
            ))}
            
            {/* Sun with glow effect - fixed position in world space, more visible */}
            <group position={[15, 18, -25]}>
                {/* Main sun - bright white light source */}
                <mesh>
                    <sphereGeometry args={[2.5, 32, 32]} />
                    <meshBasicMaterial 
                        color="#FFFFFF" 
                    />
                </mesh>
                {/* Outer glow */}
                <mesh>
                    <sphereGeometry args={[3.5, 32, 32]} />
                    <meshBasicMaterial 
                        color="#FFF8E7" 
                        opacity={0.6}
                        transparent
                    />
                </mesh>
                {/* Sun rays/diffusion */}
                <mesh>
                    <sphereGeometry args={[5, 32, 32]} />
                    <meshBasicMaterial 
                        color="#FFFEF0" 
                        opacity={0.3}
                        transparent
                    />
                </mesh>
            </group>
        </>
    )
}

