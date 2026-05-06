import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'slice-lock',
  title: 'Slice Lock',
  status: 'prototype',
  qualityGrade: 'D',
  placement: 'archive',
  seed: 'slice-lock-001',
  interaction: 'time',
  visualPrimitive: 'planes',
  visualDirection: 'editorial-motion',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is testing whether hard poster columns can make simple moving bands feel locked and editorial.',
  reference: 'offset print strips trapped in poster columns',
  antiReference: 'full-screen procedural stripe wallpaper',
  description: 'Moving color bands slide behind three fixed column masks and never escape the poster grid.',
  constraints: ['no new assets', 'flat planes only', 'motion must stay inside fixed columns'],
  performanceBudget: 'under 70 flat planes, no custom shaders, no postprocessing',
  mobilePolicy: 'required: same column layout with reduced spacing if needed',
  motionComfort: 'low risk: slow lateral band motion; freeze bands when reduced motion is requested',
  rubric: { clarity: 2, novelty: 2, performance: 5, implementation: 4, taste: 1, total: 14 },
  verdict: 'Prototype/D: weak after user grading; archived so it does not appear in Keepers.',
}
