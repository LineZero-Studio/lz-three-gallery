import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'magnetic-field',
  title: 'Magnetic Field',
  status: 'showcase',
  qualityGrade: 'A',
  placement: 'main',
  seed: 'magnetic-field-001',
  interaction: 'time+cursor',
  visualPrimitive: 'points',
  visualDirection: 'scientific-diagram',
  noveltyAxis: 'interaction',
  noveltyClaim: 'The novelty is a magnetic-field diagram with concentric target rings instead of toy-like particle attraction.',
  reference: 'magnetic field measurement plot',
  antiReference: 'generic mouse particle toy',
  description: 'Seeded points bend toward a magnetic target like a measurement diagram.',
  constraints: ['no new assets', '180 points', 'cursor optional'],
  performanceBudget: '180 points, one attribute update per frame, no postprocessing',
  mobilePolicy: 'reduced: without precise cursor the field remains readable as a static plot',
  motionComfort: 'low risk: local field pull; freeze drift and attraction when reduced motion is requested',
  rubric: { clarity: 5, novelty: 5, performance: 5, implementation: 4, taste: 5, total: 24 },
  verdict: 'Showcase: the new best effect; scientific-diagram language with concentric rings is distinct and immediately readable.',
}