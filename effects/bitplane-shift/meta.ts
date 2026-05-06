import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'bitplane-shift',
  title: 'Bitplane Shift',
  status: 'prototype',
  qualityGrade: 'D',
  placement: 'archive',
  seed: 'bitplane-shift-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'terminal-diagnostic',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is stacking deterministic binary planes with small registration offsets.',
  reference: 'RGB bitplane diagnostic display',
  antiReference: 'fullscreen glitch wallpaper',
  description: 'Offset red, green, and blue bitplanes pulse as a compact diagnostic display.',
  constraints: ['no new assets', 'single fullscreen shader', 'three deterministic bitplanes'],
  performanceBudget: 'one fullscreen plane, three cell passes, no textures',
  mobilePolicy: 'required: same grid density on mobile',
  motionComfort: 'medium-low: slow threshold pulses; freeze when reduced motion is requested',
  rubric: { clarity: 2, novelty: 2, performance: 5, implementation: 3, taste: 1, total: 13 },
  verdict: 'Weak after user grading: archived until the bitplane idea gets a stronger visual rule.',
}
