import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'ink-register',
  title: 'Ink Register',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'ink-register-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'optical-print',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is adding visible registration error to the falling-bars print language.',
  reference: 'screenprint registration test sheet',
  antiReference: 'random glitch stripes',
  description: 'Misregistered cyan, red, and black ink bars crawl across a paper-like test sheet.',
  constraints: ['no new assets', 'single fullscreen shader', 'deterministic ink noise'],
  performanceBudget: 'one fullscreen plane, three analytic bar passes, no textures',
  mobilePolicy: 'required: same composition on mobile with capped DPR',
  motionComfort: 'medium-low: vertical crawl; freeze crawl when reduced motion is requested',
  rubric: { clarity: 3, novelty: 3, performance: 5, implementation: 4, taste: 3, total: 18 },
  verdict: 'Prototype after user grading: the print-registration direction is promising but not solid yet.',
}
