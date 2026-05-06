import type { ComponentType } from 'react'

export type EffectStatus = 'showcase' | 'solid' | 'prototype' | 'failed'
export type QualityGrade = 'A' | 'B' | 'C' | 'D' | 'F'
export type EffectPlacement = 'main' | 'archive'
export type EffectInteraction =
  | 'time'
  | 'scroll'
  | 'cursor'
  | 'time+scroll'
  | 'time+cursor'
  | 'scroll+cursor'
  | 'all'
  | 'none'
export type VisualPrimitive = 'points' | 'lines' | 'planes' | 'shader' | 'text' | 'mixed'
export type VisualDirection =
  | 'minimal-graphic'
  | 'lo-fi-webgl'
  | 'editorial-motion'
  | 'shader-study'
  | 'scientific-diagram'
  | 'terminal-diagnostic'
  | 'arcade-vector'
  | 'optical-print'
  | 'material-abstraction'
  | 'kinetic-type'
export type NoveltyAxis = 'technique' | 'composition' | 'interaction' | 'mixed'

export interface EffectRubric {
  clarity: number
  novelty: number
  performance: number
  implementation: number
  taste: number
  total: number
}

export interface EffectMeta {
  slug: string
  title: string
  status: EffectStatus
  qualityGrade: QualityGrade
  placement: EffectPlacement
  seed: string
  interaction: EffectInteraction
  visualPrimitive: VisualPrimitive
  visualDirection: VisualDirection
  noveltyAxis: NoveltyAxis
  noveltyClaim: string
  reference: string
  antiReference: string
  description: string
  constraints: string[]
  performanceBudget: string
  mobilePolicy: string
  motionComfort: string
  rubric: EffectRubric
  verdict: string
}

export interface EffectSceneProps {
  seed: string
  reducedMotion: boolean
}

export type EffectSceneComponent = ComponentType<EffectSceneProps>

export type EffectDefinition = EffectMeta & {
  Scene: EffectSceneComponent
}
