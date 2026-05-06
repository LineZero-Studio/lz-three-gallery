import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'hinge-field',
  title: 'Hinge Field',
  status: 'prototype',
  qualityGrade: 'D',
  placement: 'archive',
  seed: 'hinge-field-001',
  interaction: 'time+cursor',
  visualPrimitive: 'lines',
  visualDirection: 'scientific-diagram',
  noveltyAxis: 'interaction',
  noveltyClaim: 'The novelty is replacing loose particle attraction with fixed hinges that rotate under cursor pressure.',
  reference: 'mechanical linkage stress diagram',
  antiReference: 'cursor particle swarm',
  description: 'Short hinged bars pivot around fixed anchors as the cursor applies local pressure.',
  constraints: ['no new assets', 'fixed anchor topology', 'one line buffer update per frame'],
  performanceBudget: '72 hinge segments, one buffer update per frame, no postprocessing',
  mobilePolicy: 'required: same hinges; cursor falls back to center',
  motionComfort: 'low risk: subtle rotations; freeze breathing when reduced motion is requested',
  rubric: { clarity: 2, novelty: 2, performance: 5, implementation: 4, taste: 1, total: 14 },
  verdict: 'Prototype/D: weak after user grading; archived so it does not appear in Keepers.',
}
