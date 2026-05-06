import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'type-drift',
  title: 'Type Drift',
  status: 'prototype',
  qualityGrade: 'D',
  placement: 'archive',
  seed: 'type-drift-001',
  interaction: 'time',
  visualPrimitive: 'text',
  visualDirection: 'kinetic-type',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is seeded typographic fragments drifting in a sparse field without narrative.',
  reference: 'floating typographic fragments',
  antiReference: 'falling letters animation',
  description: 'Seeded typographic fragments drift in a sparse dark field.',
  constraints: ['no new assets', '12 text fragments', 'no narrative'],
  performanceBudget: '12 mesh-based text fragments, per-frame matrix updates, no postprocessing',
  mobilePolicy: 'required: same fragment count on mobile with capped DPR',
  motionComfort: 'low risk: slow drift; freeze movement when reduced motion is requested',
  rubric: { clarity: 2, novelty: 2, performance: 5, implementation: 3, taste: 1, total: 13 },
  verdict: 'Prototype/D: weak after grading; archived during consolidation until rebuilt with stronger editorial direction.',
}
