import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'vein-map',
  title: 'Vein Map',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'vein-map-001',
  interaction: 'time+cursor',
  visualPrimitive: 'lines',
  visualDirection: 'scientific-diagram',
  noveltyAxis: 'mixed',
  noveltyClaim: 'The novelty is a leaf-vein diagram whose source node can be gently repositioned.',
  reference: 'botanical venation measurement drawing',
  antiReference: 'decorative lightning web',
  description: 'Seeded vein paths pull from a cursor-controlled source node inside a leaf-shaped field.',
  constraints: ['no new assets', '193 line segments', 'cursor optional'],
  performanceBudget: '193 line segments, one position update per frame, no postprocessing',
  mobilePolicy: 'required: same structure; touch repositions the source node when available',
  motionComfort: 'low: slight vein pulse; freeze pulse when reduced motion is requested',
  rubric: { clarity: 3, novelty: 3, performance: 5, implementation: 4, taste: 3, total: 18 },
  verdict: 'Prototype after user grading: the biological diagram read is promising but not solid yet.',
}
