import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'depth-cards',
  title: 'Depth Cards',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'depth-cards-001',
  interaction: 'time',
  visualPrimitive: 'planes',
  visualDirection: 'editorial-motion',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is turning editorial crop cards into a minimal z-space rhythm.',
  reference: 'floating magazine crop marks',
  antiReference: 'generic 3D card carousel',
  description: 'Flat crop cards drift through shallow depth like an editorial layout system.',
  constraints: ['no new assets', '28 instanced cards', 'one material'],
  performanceBudget: '28 instanced planes, one matrix update per card, no textures, no postprocessing',
  mobilePolicy: 'required: same card count on mobile with capped DPR',
  motionComfort: 'medium risk: depth drift; freeze z travel when reduced motion is requested',
  rubric: { clarity: 3, novelty: 3, performance: 5, implementation: 4, taste: 3, total: 18 },
  verdict: 'Prototype: clear enough as a depth/layout study, but it may need typography or stronger rules later.',
}
