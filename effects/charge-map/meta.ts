import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'charge-map',
  title: 'Charge Map',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'charge-map-001',
  interaction: 'time+cursor',
  visualPrimitive: 'shader',
  visualDirection: 'scientific-diagram',
  noveltyAxis: 'mixed',
  noveltyClaim: 'The novelty is turning the winning magnetic pull into a heat-and-contour field map.',
  reference: 'charged particle field diagram with heat contours',
  antiReference: 'generic neon plasma shader',
  description: 'A cursor charge bends a heat-contour field against two fixed reference charges.',
  constraints: ['no new assets', 'single fullscreen shader', 'cursor optional'],
  performanceBudget: 'one fullscreen plane, no textures, no postprocessing',
  mobilePolicy: 'required: same shader with capped DPR; cursor falls back to center',
  motionComfort: 'low risk: slow contour drift; freeze drift when reduced motion is requested',
  rubric: { clarity: 3, novelty: 3, performance: 5, implementation: 4, taste: 3, total: 18 },
  verdict: 'Prototype after user grading: the map idea is clear, but it needs a stronger visual pass before joining the solid group.',
}
