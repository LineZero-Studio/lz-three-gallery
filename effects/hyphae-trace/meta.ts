import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'hyphae-trace',
  title: 'Hyphae Trace',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'hyphae-trace-001',
  interaction: 'time',
  visualPrimitive: 'lines',
  visualDirection: 'scientific-diagram',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is a seeded branching network revealed as a drawing instead of simulated biology.',
  reference: 'hyphae growth diagram in ink',
  antiReference: 'random lightning branches',
  description: 'A seeded hyphae-like line network draws itself from one root.',
  constraints: ['no new assets', '190 line segments max', 'seeded branching only'],
  performanceBudget: 'up to 190 line segments, one attribute update per frame, no postprocessing',
  mobilePolicy: 'required: same segment count on mobile with capped DPR',
  motionComfort: 'low: one reveal pass; show completed network when reduced motion is requested',
  rubric: { clarity: 4, novelty: 4, performance: 5, implementation: 3, taste: 2, total: 18 },
  verdict: 'Prototype after user grading: simpler line-only version is the keeper, but it remains below solid.',
}
