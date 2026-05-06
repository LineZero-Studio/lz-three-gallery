import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'ripple-field',
  title: 'Ripple Field',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'ripple-field-001',
  interaction: 'time',
  visualPrimitive: 'points',
  visualDirection: 'scientific-diagram',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is the measured point-grid displacement rather than a water simulation.',
  reference: 'lab ripple tank measurement plot',
  antiReference: 'screensaver water shader',
  description: 'A measured field of points is displaced by circular ripples from the center.',
  constraints: ['no new assets', '759 points', 'single point material'],
  performanceBudget: '759 points, one position attribute update per frame, no postprocessing',
  mobilePolicy: 'required: same count on mobile with capped DPR',
  motionComfort: 'low risk: small radial displacement; freeze wave phase when reduced motion is requested',
  rubric: { clarity: 4, novelty: 3, performance: 5, implementation: 3, taste: 2, total: 17 },
  verdict: 'Prototype: a decent start with a clear field rule, but not a top-tier keeper yet.',
}
