import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'constellation',
  title: 'Constellation',
  status: 'prototype',
  qualityGrade: 'D',
  placement: 'archive',
  seed: 'constellation-001',
  interaction: 'time',
  visualPrimitive: 'mixed',
  visualDirection: 'scientific-diagram',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is the deterministic nearest-link chart with tiny orbital drift.',
  reference: 'astronomical measurement chart',
  antiReference: 'generic connected particle network',
  description: 'Seeded points form a sparse star chart with short measured links.',
  constraints: ['no new assets', '64 points', '96 maximum links', 'seeded chart layout'],
  performanceBudget: '64 points, up to 96 line segments, two geometry updates per frame, no postprocessing',
  mobilePolicy: 'required: same counts on mobile with capped DPR',
  motionComfort: 'low risk: tiny local drift; freeze drift when reduced motion is requested',
  rubric: { clarity: 2, novelty: 2, performance: 5, implementation: 3, taste: 1, total: 13 },
  verdict: 'Prototype/D: weak after review; archived during consolidation because the chart structure is not distinct enough.',
}
