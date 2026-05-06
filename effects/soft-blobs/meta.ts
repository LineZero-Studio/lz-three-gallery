import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'soft-blobs',
  title: 'Soft Blobs',
  status: 'prototype',
  qualityGrade: 'D',
  placement: 'archive',
  seed: 'soft-blobs-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'material-abstraction',
  noveltyAxis: 'technique',
  noveltyClaim: 'The novelty is a tiny seeded metaball field kept as a flat material sample.',
  reference: 'soft gel ink study',
  antiReference: 'lava lamp screensaver',
  description: 'Seven seeded blobs merge into a soft flat material study.',
  constraints: ['no new assets', 'one shader plane', 'seven analytic blobs'],
  performanceBudget: 'one full-screen shader plane, seven fixed blob evaluations, no postprocessing',
  mobilePolicy: 'required: same shader on mobile with capped DPR',
  motionComfort: 'low risk: slow orbital drift; freeze blob phase when reduced motion is requested',
  rubric: { clarity: 2, novelty: 2, performance: 3, implementation: 2, taste: 1, total: 10 },
  verdict: 'Prototype/D: weak and buggy; archived during consolidation until rebuilt.',
}
