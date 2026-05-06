import React, { useRef } from 'react'
import { vertex, fragment } from './Shader';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue, transform } from "framer-motion"

interface ModelProps {
  scrollProgress: MotionValue<number>;
}

export default function Model({ scrollProgress }: ModelProps) {
  const { viewport, camera } = useThree();
  
  const lineDensity = 50;
  const animationSpeed = 0.15;
  const waveAmplitude = 0.3;
  const scale = 0.5;
  const color = '#E6E2DD';
  const lineWidth = 0.1;
  const numContours = 15;
  const lightIntensity = 0.15;
  const warpStrength = 0.5;
  const flowAngle = 116;
  const flowStrength = 0.6;
  const anisotropy = 0.5;

  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const uniforms = useRef({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
    uAmplitude: { value: waveAmplitude },
    uSpeed: { value: animationSpeed },
    uScale: { value: scale },
    uColor: { value: new THREE.Color(color) },
    uLineWidth: { value: lineWidth },
    uNumContours: { value: numContours },
    uMode: { value: 1.0 },
    uLightIntensity: { value: lightIntensity },
    uWarpStrength: { value: warpStrength },
    uFlowAngle: { value: (flowAngle * Math.PI) / 180.0 },
    uFlowStrength: { value: flowStrength },
    uAnisotropy: { value: anisotropy }
  });

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Update time for continuous animation
    timeRef.current += delta * animationSpeed;
    uniforms.current.uTime.value = timeRef.current;
    
    // Update scroll progress
    const scroll = scrollProgress.get();
    uniforms.current.uScrollProgress.value = scroll;
    
    // Update uniforms
    uniforms.current.uAmplitude.value = waveAmplitude;
    uniforms.current.uSpeed.value = animationSpeed;
    uniforms.current.uScale.value = scale;
    uniforms.current.uColor.value = new THREE.Color(color);
    uniforms.current.uLineWidth.value = lineWidth;
    uniforms.current.uNumContours.value = numContours;
    uniforms.current.uMode.value = 1.0;
    uniforms.current.uLightIntensity.value = lightIntensity;
    uniforms.current.uWarpStrength.value = warpStrength;
    uniforms.current.uFlowAngle.value = (flowAngle * Math.PI) / 180.0; // Convert degrees to radians
    uniforms.current.uFlowStrength.value = flowStrength;
    uniforms.current.uAnisotropy.value = anisotropy;
    
    // Scroll-based journey: camera movement
    const cameraZ = transform(scroll, [0, 1], [5, 2]);
    const cameraY = transform(scroll, [0, 1], [0, -2]);
    camera.position.z = cameraZ;
    camera.position.y = cameraY;
    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, lineDensity, lineDensity]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
        transparent={false}
        side={THREE.DoubleSide}
        depthWrite
      />
    </mesh>
  );
}

