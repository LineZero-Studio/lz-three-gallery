import { Canvas } from '@react-three/fiber'
import React from 'react'
import Model from './Model'
import { MotionValue } from 'framer-motion';

interface SceneProps {
    scrollProgress: MotionValue<number>;
}

export default function Scene({scrollProgress}: SceneProps) {
    return (
        <Canvas>
            <Model scrollProgress={scrollProgress}/>
        </Canvas>
    )
}
