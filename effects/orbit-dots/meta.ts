import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'orbit-dots',
  title: 'Orbit Dots',
  status: 'prototype',
  qualityGrade: 'D',
  placement: 'archive',
  seed: 'orbit-dots-001',
  interaction: 'time',
  visualPrimitive: 'points',
  visualDirection: 'lo-fi-webgl',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is the orrery-like depth ordering from a tiny seeded point system.',
  reference: 'mechanical orrery diagram made of light dots',
  antiReference: 'random particle swarm',
  description: 'Seeded points orbit the center like a small mechanical depth diagram.',
  constraints: ['no new assets', '128 points', 'one point material'],
  performanceBudget: '128 points, one geometry attribute update per frame, no postprocessing',
  mobilePolicy: 'required: same point count on mobile with capped DPR',
  motionComfort: 'low risk: slow circular motion; freeze orbits when reduced motion is requested',
  rubric: { clarity: 2, novelty: 2, performance: 5, implementation: 3, taste: 1, total: 13 },
  verdict: 'Prototype/D: weak after review; archived during consolidation because the current orbit result lacks taste.',
}
