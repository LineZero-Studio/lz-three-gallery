import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'topo-slices',
  title: 'Topo Slices',
  status: 'prototype',
  qualityGrade: 'D',
  placement: 'archive',
  seed: 'topo-slices-001',
  interaction: 'time',
  visualPrimitive: 'lines',
  visualDirection: 'material-abstraction',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is reducing liquid topography to animated stacked line slices.',
  reference: 'flat liquid contour section drawing',
  antiReference: '3D terrain wireframe',
  description: 'Stacked contour slices ripple like a flat liquid section drawing.',
  constraints: ['no new assets', '616 line segments', 'single line material'],
  performanceBudget: '616 line segments, one position update per frame, no postprocessing',
  mobilePolicy: 'required: same line count on mobile with capped DPR',
  motionComfort: 'low risk: slow horizontal line ripple; freeze phase when reduced motion is requested',
  rubric: { clarity: 2, novelty: 2, performance: 4, implementation: 3, taste: 1, total: 12 },
  verdict: 'Prototype/D: weak after grading; archived during consolidation so it does not dilute main.',
}
