import React, { useRef, Suspense } from 'react'
import { fragment, vertex } from './Shader';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture, useAspect } from '@react-three/drei'
import * as THREE from 'three';
import { MotionValue, transform } from "framer-motion"

export default function Model({scrollProgress}) {

    const image = useRef(null);
    const texture = useTexture("/images/car.jpg")
    const { width, height } = texture.image;
    const { viewport } = useThree();
    const scale = useAspect(
        width,
        height,
        0.3
    )

    const [oldScrollProgress, setOldScrollProgress] = React.useState(0);
    const [currentAnimation, setCurrentAnimation] = React.useState("bulge");

    const activateBulge = () => {
        setCurrentAnimation("bulge");
    }

    const activateDip = () => {
        setCurrentAnimation("dip");
    }

    const activateNormal = () => {
        setCurrentAnimation("normal");
    }

    const amplitude = 0.5;
    const waveLength = 3;

    const uniforms = useRef({
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uWaveLength: { value: waveLength },
        uDirection: { value: 0 },
        uTexture: { value: texture },
        vUvScale: { value: new THREE.Vector2(0, 0) },
    })

    // @
    useFrame( () => {
        if (!image.current) return;

        //scale image based on progress of the scroll
        const scaleX = transform(scrollProgress.get(), [0, 1], [scale[0], viewport.width])
        const scaleY = transform(scrollProgress.get(), [0, 1], [scale[1], viewport.height])
        image.current.scale.x = scaleX;
        image.current.scale.y = scaleY;

        //Adjust texture to new scale
        const scaleRatio = scaleX / scaleY;
        const aspectRatio = width / height
        //scale texture inside shader
       image.current.material.uniforms.vUvScale.value.set(1, aspectRatio / scaleRatio)

        //animate wave based on progress of the scroll
        const modifiedAmplitude = transform(scrollProgress.get(), [0, 1], [amplitude, 0])

        image.current.material.uniforms.uTime.value += 0.04;
        image.current.material.uniforms.uAmplitude.value = modifiedAmplitude
        image.current.material.uniforms.uWaveLength.value = waveLength;

        //determine direction of the scroll
        if (currentAnimation == "none") {
            if(scrollProgress.get() > oldScrollProgress){
                activateBulge();
            } else if(scrollProgress.get() < oldScrollProgress){
                activateDip();
            } else {
                activateNormal();
            }
        }

        if (currentAnimation == "bulge") {
            if (image.current.material.uniforms.uDirection.value >= 1) {
                setCurrentAnimation("none");
                setTimeout(() => {
                    activateNormal();
                }, 300);
            } else {
                image.current.material.uniforms.uDirection.value += 0.05;
            }
        } else if (currentAnimation == "dip") {
            if (image.current.material.uniforms.uDirection.value <= -1) {
                setCurrentAnimation("none");
                setTimeout(() => {
                    activateNormal();
                }, 300);
            } else {
                image.current.material.uniforms.uDirection.value += -0.05;
            }
        } else if (currentAnimation == "normal") {
            if (image.current.material.uniforms.uDirection.value < 0.01 && image.current.material.uniforms.uDirection.value > -0.01) {
                setCurrentAnimation("none");
            } else {
                image.current.material.uniforms.uDirection.value += (image.current.material.uniforms.uDirection.value > 0) ? -0.05 : 0.05;
            }
            
        }

        setOldScrollProgress(scrollProgress.get());

    })

    return (
        <mesh ref={image} scale={scale}>
            <planeGeometry args={[1, 1, 15, 15]}/>
            <shaderMaterial
                wireframe={false} 
                fragmentShader={fragment}
                vertexShader={vertex}
                uniforms={uniforms.current}
            />
        </mesh>
    )
}
