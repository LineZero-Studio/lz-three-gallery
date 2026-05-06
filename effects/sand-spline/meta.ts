import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'sand-spline',
  title: 'Sand Spline',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'sand-spline-001',
  interaction: 'time',
  visualPrimitive: 'points',
  visualDirection: 'material-abstraction',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is making grains read as drawn splines rather than a particle cloud.',
  reference: 'sand plotter spline drawing',
  antiReference: 'generic particle rain',
  description: 'Tiny seeded grains sit on animated spline rows like a sand-plotter drawing.',
  constraints: ['no new assets', '640 points', 'seeded grain jitter'],
  performanceBudget: '640 points, one attribute update per frame, no postprocessing',
  mobilePolicy: 'required: same point count on mobile with capped DPR',
  motionComfort: 'low: slow spline drift; freeze drift when reduced motion is requested',
  rubric: { clarity: 3, novelty: 3, performance: 5, implementation: 4, taste: 3, total: 18 },
  verdict: 'Prototype after user grading: the spline/grain structure is promising but not solid yet.',
}
