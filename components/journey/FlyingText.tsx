import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { MotionValue, transform } from 'framer-motion'
import * as THREE from 'three'

interface FlyingTextProps {
    scrollProgress: MotionValue<number>
    text: string
    initialZ: number // Initial Z position in world space
    side: 'left' | 'right' // Which side of plane path
    appearAt: number // Scroll progress when text starts appearing (0-1)
    disappearAt: number // Scroll progress when text finishes disappearing (0-1)
    parallaxSpeed?: number // How fast text moves (0-1, lower = slower/more parallax)
    controls?: any
}

export default function FlyingText({ 
    scrollProgress, 
    text, 
    initialZ,
    side,
    appearAt, 
    disappearAt,
    parallaxSpeed = 0.3, // Default: text moves at 30% of plane speed (70% parallax)
    controls
}: FlyingTextProps) {
    const textRef = useRef<THREE.Group>(null)
    const { camera } = useThree()

    useFrame(() => {
        if (!textRef.current) return

        const scrollValue = scrollProgress.get()
        
        // Parallax effect: calculate Z position moving slower than plane
        // Plane moves from -20 to 50 (total 70 units)
        // Text moves slower to create parallax - stays visible longer
        const planeZPosition = transform(scrollValue, [0, 1], [-20, 50])
        const parallaxOffset = (planeZPosition - initialZ) * (1 - parallaxSpeed)
        const currentZ = initialZ + parallaxOffset
        
        // Update position with parallax - ensure text never overlaps plane path
        // Plane path is centered at x=0, so we need significant offset
        const sideOffset = side === 'left' ? -(controls?.sideOffset || 6) : (controls?.sideOffset || 6) // units to left or right (away from plane path)
        textRef.current.position.x = sideOffset
        textRef.current.position.z = currentZ
        textRef.current.position.y = controls?.textHeight || 7 // Keep at consistent height
        
        // Calculate opacity based on scroll position (longer visible window)
        let opacity = 0
        
        // Extended visibility window for parallax effect
        const visibleStart = appearAt - 0.1 // Start appearing earlier
        const visibleEnd = disappearAt + 0.1 // Stay visible longer
        
        if (scrollValue >= visibleStart && scrollValue <= visibleEnd) {
            // Fade in phase
            const fadeInEnd = appearAt + 0.05
            if (scrollValue <= fadeInEnd && scrollValue >= visibleStart) {
                opacity = transform(scrollValue, [visibleStart, fadeInEnd], [0, 1])
            } 
            // Full visibility phase
            else if (scrollValue >= fadeInEnd && scrollValue <= disappearAt - 0.05) {
                opacity = 1
            }
            // Fade out phase
            else if (scrollValue > disappearAt - 0.05) {
                opacity = transform(scrollValue, [disappearAt - 0.05, visibleEnd], [1, 0])
            }
        }
        
        // Make text face the camera (billboard effect)
        textRef.current.lookAt(camera.position)
        
        // Update text opacity
        if (textRef.current.children[0]) {
            const material = (textRef.current.children[0] as THREE.Mesh).material as THREE.Material
            if (Array.isArray(material)) {
                material.forEach(mat => {
                    if ('opacity' in mat) {
                        mat.opacity = opacity
                        mat.transparent = opacity < 1
                    }
                })
            } else {
                if ('opacity' in material) {
                    material.opacity = opacity
                    material.transparent = opacity < 1
                }
            }
        }
        
        // Scale text based on opacity for fade effect
        const scale = 0.8 + opacity * 0.2
        textRef.current.scale.set(scale, scale, scale)
    })

    return (
        <group ref={textRef} position={[side === 'left' ? -(controls?.sideOffset || 6) : (controls?.sideOffset || 6), controls?.textHeight || 7, initialZ]}>
            <Text
                fontSize={controls?.fontSize || 1.5}
                color="#000000"
                anchorX="center"
                anchorY="middle"
                maxWidth={6}
            >
                {text}
            </Text>
        </group>
    )
}

