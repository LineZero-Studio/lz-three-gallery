import React, { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'

interface PlaneTrailProps {
    scrollProgress: MotionValue<number>
    planeRef: React.RefObject<THREE.Group>
    controls: any
}

export default function PlaneTrail({ scrollProgress, planeRef, controls }: PlaneTrailProps) {
    const line = useMemo(() => new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ transparent: true })), [])
    const trailPositions = useRef<THREE.Vector3[]>([])
    const maxPoints = 150
    const lastUpdateTime = useRef(0)

    useFrame((state) => {
        if (!planeRef.current) return

        // Sample trail points less frequently for performance
        const currentTime = state.clock.elapsedTime
        if (currentTime - lastUpdateTime.current < 0.1) return
        lastUpdateTime.current = currentTime

        const planePosition = planeRef.current.position.clone()
        
        // Add current plane position to trail
        if (trailPositions.current.length === 0 || 
            planePosition.distanceTo(trailPositions.current[trailPositions.current.length - 1]) > 0.5) {
            trailPositions.current.push(planePosition)
        }
        
        // Limit trail length
        if (trailPositions.current.length > maxPoints) {
            trailPositions.current.shift()
        }

        // Update trail geometry
        if (trailPositions.current.length >= 2) {
            const positions = new Float32Array(trailPositions.current.length * 3)
            trailPositions.current.forEach((pos, i) => {
                positions[i * 3] = pos.x
                positions[i * 3 + 1] = pos.y
                positions[i * 3 + 2] = pos.z
            })

            const geometry = line.geometry as THREE.BufferGeometry
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            geometry.attributes.position.needsUpdate = true
        }
    })

    const material = line.material as THREE.LineBasicMaterial
    material.color.set(controls.Trail.trailColor)
    material.opacity = controls.Trail.trailOpacity
    material.transparent = true

    useEffect(() => {
        return () => {
            line.geometry.dispose()
            ;(line.material as THREE.Material).dispose()
        }
    }, [line])

    return (
        <primitive object={line} />
    )
}

