import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'field-lines',
  title: 'Field Lines',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'field-lines-001',
  interaction: 'time+cursor',
  visualPrimitive: 'lines',
  visualDirection: 'scientific-diagram',
  noveltyAxis: 'interaction',
  noveltyClaim: 'The novelty is translating the winning magnetic-field interaction into line strokes.',
  reference: 'magnetic vector-field instrument plot',
  antiReference: 'generic cursor particle toy',
  description: 'Short seeded vector strokes bend around a cursor target with measurement rings.',
  constraints: ['no new assets', '180 line strokes', 'cursor optional'],
  performanceBudget: '180 line segments, one position update per frame, no postprocessing',
  mobilePolicy: 'reduced: field remains readable without precise cursor input',
  motionComfort: 'low risk: local line rotation and pull only; freeze drift when reduced motion is requested',
  rubric: { clarity: 4, novelty: 3, performance: 5, implementation: 3, taste: 2, total: 17 },
  verdict: 'Prototype: a decent start, but not as strong as magnetic-field or grid-magnet.',
}
