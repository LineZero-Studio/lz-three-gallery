import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'field-pulse',
  title: 'Field Pulse',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'field-pulse-001',
  interaction: 'time+cursor',
  visualPrimitive: 'shader',
  visualDirection: 'scientific-diagram',
  noveltyAxis: 'interaction',
  noveltyClaim: 'The novelty is a magnetic target expressed through sparse pulse rings and sampled particles.',
  reference: 'field probe pulse diagram',
  antiReference: 'particle explosion visualizer',
  description: 'Sparse seeded particles brighten as measured pulse rings pass from the cursor target.',
  constraints: ['no new assets', 'single fullscreen shader', 'deterministic cell particles'],
  performanceBudget: 'one fullscreen plane, analytic rings and cell dots, no buffers',
  mobilePolicy: 'required: same composition; touch maps to pulse target when available',
  motionComfort: 'medium-low: expanding rings; freeze pulse phase when reduced motion is requested',
  rubric: { clarity: 3, novelty: 3, performance: 5, implementation: 4, taste: 3, total: 18 },
  verdict: 'Prototype after user grading: the pulse language reads, but the result is not strong enough yet.',
}
