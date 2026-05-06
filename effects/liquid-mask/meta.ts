import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'liquid-mask',
  title: 'Liquid Mask',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'liquid-mask-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'material-abstraction',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is forcing a liquid contour shader through a hard editorial mask.',
  reference: 'liquid topography inside a Swiss poster mask',
  antiReference: 'full-screen wavy texture',
  description: 'Liquid contour lines flow only inside a hard-edged graphic mask.',
  constraints: ['no new assets', 'single fullscreen shader', 'hard mask edges'],
  performanceBudget: 'one fullscreen plane, analytic mask and waves, no textures',
  mobilePolicy: 'required: same mask and contour density on mobile',
  motionComfort: 'low risk: slow liquid drift; freeze flow when reduced motion is requested',
  rubric: { clarity: 3, novelty: 3, performance: 5, implementation: 4, taste: 3, total: 18 },
  verdict: 'Prototype after user grading: the liquid-mask idea needs another visual pass before it can sit with the keepers.',
}
