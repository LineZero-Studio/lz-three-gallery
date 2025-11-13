import { Canvas } from '@react-three/fiber'
import React from 'react'
import Model from './Model'
import { MotionValue } from 'framer-motion';

interface SceneProps {
    scrollProgress: MotionValue<number>;
}

export default function Scene({scrollProgress}: SceneProps) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ alpha: false }}>
            <color attach="background" args={['#000000']} />
            <Model scrollProgress={scrollProgress}/>
        </Canvas>
    )
}

