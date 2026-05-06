import React, { useRef, useState, useEffect } from 'react'

interface FPSCounterProps {
    targetFPS?: number
}

export default function FPSCounter({ targetFPS = 60 }: FPSCounterProps) {
    const [fps, setFPS] = useState(0)
    const [frameTime, setFrameTime] = useState(0)
    const [performancePercent, setPerformancePercent] = useState(100)
    
    const lastTime = useRef(performance.now())
    const frameCount = useRef(0)
    const fpsHistory = useRef<number[]>([])
    const maxHistorySize = 30 // Average over 30 frames
    const rafId = useRef<number | null>(null)
    
    useEffect(() => {
        const updateFPS = () => {
            const currentTime = performance.now()
            const delta = currentTime - lastTime.current
            
            frameCount.current++
            
            if (delta >= 1000) {
                // Calculate FPS
                const currentFPS = Math.round((frameCount.current * 1000) / delta)
                const currentFrameTime = delta / frameCount.current
                
                // Store in history
                fpsHistory.current.push(currentFPS)
                if (fpsHistory.current.length > maxHistorySize) {
                    fpsHistory.current.shift()
                }
                
                // Calculate average FPS
                const avgFPS = Math.round(
                    fpsHistory.current.reduce((a, b) => a + b, 0) / fpsHistory.current.length
                )
                
                // Calculate performance percentage
                const perf = Math.min(100, Math.round((avgFPS / targetFPS) * 100))
                
                setFPS(avgFPS)
                setFrameTime(Math.round(currentFrameTime * 10) / 10)
                setPerformancePercent(perf)
                
                // Reset counters
                frameCount.current = 0
                lastTime.current = currentTime
            }
            
            rafId.current = requestAnimationFrame(updateFPS)
        }
        
        rafId.current = requestAnimationFrame(updateFPS)
        
        return () => {
            if (rafId.current !== null) {
                cancelAnimationFrame(rafId.current)
            }
        }
    }, [targetFPS])
    
    // Determine color based on performance
    const getColor = () => {
        if (performancePercent >= 90) return '#4ade80' // Green
        if (performancePercent >= 60) return '#fbbf24' // Yellow
        if (performancePercent >= 30) return '#fb923c' // Orange
        return '#ef4444' // Red
    }
    
    // Determine status text
    const getStatus = () => {
        if (performancePercent >= 90) return 'Excellent'
        if (performancePercent >= 60) return 'Good'
        if (performancePercent >= 30) return 'Poor'
        return 'Critical'
    }
    
    return (
        <div
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#fff',
                padding: '12px 16px',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '14px',
                zIndex: 1000,
                minWidth: '200px',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${getColor()}`,
            }}
        >
            <div style={{ marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>FPS:</span>
                    <span style={{ color: getColor(), fontWeight: 'bold', fontSize: '16px' }}>{fps}</span>
                </div>
            </div>
            
            <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Frame Time:</span>
                    <span>{frameTime}ms</span>
                </div>
            </div>
            
            <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Performance:</span>
                    <span style={{ color: getColor(), fontWeight: 'bold' }}>{performancePercent}%</span>
                </div>
            </div>
            
            {/* Performance bar */}
            <div style={{ marginTop: '8px' }}>
                <div
                    style={{
                        width: '100%',
                        height: '6px',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            width: `${performancePercent}%`,
                            height: '100%',
                            background: getColor(),
                            transition: 'width 0.3s ease',
                        }}
                    />
                </div>
            </div>
            
            <div style={{ marginTop: '8px', fontSize: '11px', color: getColor(), textAlign: 'center' }}>
                {getStatus()}
            </div>
            
            <div style={{ marginTop: '8px', fontSize: '10px', color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
                Target: {targetFPS} FPS
            </div>
        </div>
    )
}

