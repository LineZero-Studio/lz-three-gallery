import { Canvas, useThree, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import Plane from './Plane'
import Sky from './Sky'
import FlyingText from './FlyingText'
import PlaneTrail from './PlaneTrail'
import { MotionValue } from 'framer-motion';
import * as THREE from 'three'

interface SceneProps {
    scrollProgress: MotionValue<number>;
}

// Component to control camera position relative to plane (third-person view)
function CameraController({ planeRef, controls }: { 
    planeRef: React.RefObject<THREE.Group>
    controls: any
}) {
    const { camera } = useThree()
    
    useFrame(() => {
        if (!planeRef.current) return
        
        // Third-person view: camera positioned behind the plane
        const planePosition = planeRef.current.position
        
        // Position camera behind and slightly above the plane
        camera.position.x = planePosition.x + controls.cameraOffsetX
        camera.position.y = planePosition.y + controls.cameraOffsetY
        camera.position.z = planePosition.z - controls.cameraDistance
        
        // Look ahead in the direction the plane is flying
        const lookTarget = new THREE.Vector3(
            planePosition.x,
            planePosition.y,
            planePosition.z + controls.lookAheadDistance
        )
        camera.lookAt(lookTarget)
    })
    
    return null
}

export default function Scene({scrollProgress}: SceneProps) {
    const planeRef = useRef<THREE.Group>(null)
    
    const cameraControls = {
        cameraOffsetX: 0,
        cameraOffsetY: 2,
        cameraDistance: 8,
        lookAheadDistance: 20,
        fov: 75
    }
    
    const fogControls = {
        fogColor: '#87CEEB',
        fogNear: 30,
        fogFar: 100
    }
    
    const lightingControls = {
        lightPositionX: 15,
        lightPositionY: 18,
        lightPositionZ: -25,
        lightIntensity: 2,
        lightColor: '#FFFEF0'
    }
    
    const skyControls = {
        skyColor: '#87CEEB'
    }
    
    const cloudControls = {
        cloudCover: 0.45,
        cloudDensity: 0.35,
        cloudColor: '#ffffff',
        skyColorCloud: '#87CEEB',
        absorption: 0.12,
        powderStrength: 1.0,
        scatteringG: 0.4,
        backScatterG: -0.3,
        backScatterMix: 0.3,
        multipleScatterSamples: 3.0,
        lightStepSize: 2.0,
        rayStepSize: 2.5,
        maxLightSamples: 8,
        maxRaySamples: 32,
        sunPositionX: 15,
        sunPositionY: 18,
        sunPositionZ: -25
    }
    
    const trailControls = {
        trailColor: '#ffffff',
        trailOpacity: 0.9
    }
    
    const textControls = {
        fontSize: 1.5,
        sideOffset: 6,
        textHeight: 7,
        parallaxSpeed: 0.25
    }
    
    // Combine controls for passing to components
    const controls = {
        Camera: cameraControls,
        Fog: fogControls,
        Lighting: lightingControls,
        Sky: skyControls,
        Clouds: cloudControls,
        Trail: trailControls,
        Text: textControls
    }
    
    return (
        <Canvas 
            camera={{ position: [0, 7, -12], fov: controls.Camera.fov }}
            gl={{ alpha: false }}
        >
            {/* Atmospheric fog for depth */}
            <fog attach="fog" args={[controls.Fog.fogColor, controls.Fog.fogNear, controls.Fog.fogFar]} />
            
            {/* Simple sky lighting */}
            <directionalLight 
                position={[controls.Lighting.lightPositionX, controls.Lighting.lightPositionY, controls.Lighting.lightPositionZ]} 
                intensity={controls.Lighting.lightIntensity}
                color={controls.Lighting.lightColor}
            />
            
            <Sky scrollProgress={scrollProgress} controls={controls} />
            <Plane ref={planeRef} scrollProgress={scrollProgress} />
            <PlaneTrail scrollProgress={scrollProgress} planeRef={planeRef} controls={controls} />
            <CameraController planeRef={planeRef} controls={cameraControls} />
            
            {/* Paragraphs that appear as you fly - alternating sides with parallax */}
            <FlyingText 
                scrollProgress={scrollProgress}
                text="Welcome to the journey"
                initialZ={-15}
                side="right"
                appearAt={0.0}
                disappearAt={0.18}
                parallaxSpeed={controls.Text.parallaxSpeed}
                controls={controls.Text}
            />
            <FlyingText 
                scrollProgress={scrollProgress}
                text="The sky stretches endlessly before you"
                initialZ={5}
                side="left"
                appearAt={0.12}
                disappearAt={0.35}
                parallaxSpeed={controls.Text.parallaxSpeed}
                controls={controls.Text}
            />
            <FlyingText 
                scrollProgress={scrollProgress}
                text="Clouds drift peacefully in the distance"
                initialZ={25}
                side="right"
                appearAt={0.28}
                disappearAt={0.52}
                parallaxSpeed={controls.Text.parallaxSpeed}
                controls={controls.Text}
            />
            <FlyingText 
                scrollProgress={scrollProgress}
                text="Each moment brings new horizons"
                initialZ={45}
                side="left"
                appearAt={0.45}
                disappearAt={0.70}
                parallaxSpeed={controls.Text.parallaxSpeed}
                controls={controls.Text}
            />
            <FlyingText 
                scrollProgress={scrollProgress}
                text="The journey continues..."
                initialZ={65}
                side="right"
                appearAt={0.65}
                disappearAt={0.90}
                parallaxSpeed={controls.Text.parallaxSpeed}
                controls={controls.Text}
            />
        </Canvas>
    )
}
