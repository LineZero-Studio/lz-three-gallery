import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { useFrame } from '@react-three/fiber'
import { MotionValue, transform } from "framer-motion"
import * as THREE from 'three'

interface PlaneProps {
    scrollProgress: MotionValue<number>
}

const Plane = forwardRef<THREE.Group, PlaneProps>(({ scrollProgress }, ref) => {
    const planeRef = useRef<THREE.Group>(null)
    const propellerRef = useRef<THREE.Mesh>(null)
    const propellerRotation = useRef(0)
    
    // Expose the plane ref to parent
    useImperativeHandle(ref, () => planeRef.current as THREE.Group)

    useFrame((state, delta) => {
        if (!planeRef.current) return

        // Calculate forward position based on scroll (0 to 1 maps to -20 to 50 in Z)
        const scrollValue = scrollProgress.get()
        const zPosition = transform(scrollValue, [0, 1], [-20, 50])
        
        // Move plane forward
        planeRef.current.position.z = zPosition
        
        // Slight vertical movement for realism (gentle up and down)
        planeRef.current.position.y = 5 + Math.sin(scrollValue * Math.PI * 2) * 0.5
        
        // Gentle banking/rotation based on scroll
        planeRef.current.rotation.z = Math.sin(scrollValue * Math.PI * 4) * 0.1
        planeRef.current.rotation.x = Math.sin(scrollValue * Math.PI * 3) * 0.05
        
        // Always face forward direction
        planeRef.current.rotation.y = 0
        
        // Spin propeller continuously
        if (propellerRef.current) {
            propellerRotation.current += delta * 50
            propellerRef.current.rotation.z = propellerRotation.current
        }
    })

    return (
        <group ref={planeRef} position={[0, 5, -20]}>
            {/* Main fuselage */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.3, 0.15, 1.5]} />
                <meshStandardMaterial color="#e0e0e0" />
            </mesh>
            
            {/* Cockpit */}
            <mesh position={[0, 0.05, 0.7]}>
                <boxGeometry args={[0.25, 0.2, 0.3]} />
                <meshStandardMaterial color="#c0c0c0" />
            </mesh>
            
            {/* Main wings */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[3, 0.05, 0.8]} />
                <meshStandardMaterial color="#d0d0d0" />
            </mesh>
            
            {/* Tail wing */}
            <mesh position={[0, 0.3, -0.5]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[1, 0.03, 0.4]} />
                <meshStandardMaterial color="#d0d0d0" />
            </mesh>
            
            {/* Vertical stabilizer */}
            <mesh position={[0, 0.5, -0.3]}>
                <boxGeometry args={[0.03, 0.4, 0.3]} />
                <meshStandardMaterial color="#d0d0d0" />
            </mesh>
            
            {/* Propeller (spinning) */}
            <mesh ref={propellerRef} position={[0, 0, 0.8]}>
                <boxGeometry args={[0.8, 0.02, 0.02]} />
                <meshStandardMaterial color="#333" />
            </mesh>
        </group>
    )
})

Plane.displayName = 'Plane'

export default Plane

