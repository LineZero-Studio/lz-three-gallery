import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'threshold-map',
  title: 'Threshold Map',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'threshold-map-001',
  interaction: 'time+cursor',
  visualPrimitive: 'shader',
  visualDirection: 'terminal-diagnostic',
  noveltyAxis: 'interaction',
  noveltyClaim: 'The novelty is exposing a deterministic threshold as the only interaction parameter.',
  reference: 'binary classifier confidence map',
  antiReference: 'random blinking grid',
  description: 'Deterministic cells cross a cursor-controlled threshold with a visible ruler marker.',
  constraints: ['no new assets', 'single fullscreen shader', 'cursor optional'],
  performanceBudget: 'one fullscreen plane, one cell lookup per pixel, no textures',
  mobilePolicy: 'required: touch controls threshold when available',
  motionComfort: 'low: slow value wave; freeze wave when reduced motion is requested',
  rubric: { clarity: 3, novelty: 3, performance: 5, implementation: 4, taste: 3, total: 18 },
  verdict: 'Prototype after user grading: the threshold rule is readable but needs more taste before promotion.',
}
