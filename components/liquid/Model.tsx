import React, { useRef } from 'react'
import { useControls } from 'leva';
import { vertex, fragment } from './Shader';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue, transform } from "framer-motion"

interface ModelProps {
  scrollProgress: MotionValue<number>;
}

export default function Model({ scrollProgress }: ModelProps) {
  const { viewport, camera } = useThree();
  
  const {
    mode,
    lineDensity,
    animationSpeed,
    waveAmplitude,
    scale,
    journeySpeed,
    color,
    lineWidth,
    numContours,
    lightIntensity,
    warpStrength,
    flowAngle,
    flowStrength,
    anisotropy
  } = useControls({
    mode: { value: 'surfaces', options: ['lines', 'surfaces'] },
    lineDensity: { value: 50, min: 20, max: 100, step: 5 },
    animationSpeed: { value: 0.2, min: 0, max: 2, step: 0.01 },
    waveAmplitude: { value: 0.3, min: 0, max: 1, step: 0.05 },
    scale: { value: 0.5, min: 0.5, max: 5, step: 0.1 },
    journeySpeed: { value: 1.0, min: 0, max: 3, step: 0.1 },
    color: { value: '#E6E2DD', label: 'Color' },
    lineWidth: { value: 0.1, min: 0.01, max: 0.5, step: 0.01 },
    numContours: { value: 15, min: 5, max: 30, step: 1 },
    lightIntensity: { value: 0.3, min: 0, max: 2, step: 0.1 },
    warpStrength: { value: 0.5, min: 0, max: 2, step: 0.1, label: 'Warp Strength' },
    flowAngle: { value: 0.0, min: 0, max: 360, step: 1, label: 'Flow Angle (degrees)' },
    flowStrength: { value: 0.3, min: 0, max: 2, step: 0.1, label: 'Flow Strength' },
    anisotropy: { value: 2.0, min: 0.1, max: 5, step: 0.1, label: 'Anisotropy' }
  });

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
    uMode: { value: mode === 'lines' ? 0.0 : 1.0 },
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
    uniforms.current.uMode.value = mode === 'lines' ? 0.0 : 1.0;
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
        transparent={mode === 'lines'}
        side={THREE.DoubleSide}
        depthWrite={mode === 'surfaces'}
      />
    </mesh>
  );
}

