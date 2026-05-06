import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'particle-rain',
  title: 'Particle Rain',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'particle-rain-001',
  interaction: 'time',
  visualPrimitive: 'lines',
  visualDirection: 'terminal-diagnostic',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is sparse depth-coded rain strokes rather than dense particle weather.',
  reference: 'instrument precipitation trace',
  antiReference: 'generic blue particle rain',
  description: 'Sparse vertical strokes fall through depth like an instrument rain trace.',
  constraints: ['no new assets', '130 line strokes', 'seeded positions and speeds'],
  performanceBudget: '130 line segments, one geometry update per frame, one material, no postprocessing',
  mobilePolicy: 'required: same stroke count on mobile with capped DPR',
  motionComfort: 'low risk: slow downward motion; freeze drops when reduced motion is requested',
  rubric: { clarity: 3, novelty: 2, performance: 5, implementation: 4, taste: 3, total: 17 },
  verdict: 'Prototype: readable and restrained, but still close to generic rain unless pushed harder.',
}
