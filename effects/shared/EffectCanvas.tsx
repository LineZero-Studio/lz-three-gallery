'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import type { EffectDefinition } from '../types'

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)

    update()
    query.addEventListener('change', update)

    return () => query.removeEventListener('change', update)
  }, [])

  return reducedMotion
}

interface EffectCanvasProps {
  effect: EffectDefinition
}

export default function EffectCanvas({ effect }: EffectCanvasProps) {
  const Scene = effect.Scene
  const reducedMotion = useReducedMotionPreference()

  return (
    <div className="absolute inset-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: false, antialias: true, powerPreference: 'high-performance' }}
        style={{ height: '100%', width: '100%' }}
      >
        <Suspense fallback={null}>
          <Scene seed={effect.seed} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}
