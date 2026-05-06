import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'cursor-gravity',
  title: 'Cursor Gravity',
  status: 'solid',
  qualityGrade: 'B',
  placement: 'main',
  seed: 'cursor-gravity-001',
  interaction: 'time+cursor',
  visualPrimitive: 'points',
  visualDirection: 'scientific-diagram',
  noveltyAxis: 'interaction',
  noveltyClaim: 'The novelty is a measured attraction field that still reads without cursor movement.',
  reference: 'gravity lens particle plot',
  antiReference: 'generic mouse particle toy',
  description: 'Seeded points bend toward the cursor like a small gravity-lens diagram.',
  constraints: ['no new assets', '220 points', 'cursor optional'],
  performanceBudget: '220 points, one attribute update per frame, no postprocessing',
  mobilePolicy: 'reduced: without precise cursor the seeded field remains readable as a still plot',
  motionComfort: 'low risk: local pull only; freeze drift and attraction when reduced motion is requested',
  rubric: { clarity: 4, novelty: 4, performance: 5, implementation: 3, taste: 4, total: 20 },
  verdict: 'Solid: the cursor interaction reads as cool and should stay high in main.',
}
