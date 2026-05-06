import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'pixel-sort-fake',
  title: 'Pixel Sort Fake',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'pixel-sort-fake-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'optical-print',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is borrowing falling-bars print rhythm for fake sorted bands without images.',
  reference: 'screenprint glitch bands',
  antiReference: 'photo pixel-sort filter',
  description: 'Seeded horizontal print bands jitter like a fake pixel-sort without source imagery.',
  constraints: ['no new assets', 'one shader plane', 'seeded band offsets'],
  performanceBudget: 'one full-screen shader plane, no textures, no postprocessing',
  mobilePolicy: 'required: same shader on mobile with capped DPR',
  motionComfort: 'low risk: tiny horizontal jitter; freeze band phase when reduced motion is requested',
  rubric: { clarity: 4, novelty: 3, performance: 5, implementation: 3, taste: 2, total: 17 },
  verdict: 'Prototype: a decent start in the optical-print direction, but not cool yet.',
}
