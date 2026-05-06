import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'radial-pulse',
  title: 'Radial Pulse',
  status: 'failed',
  qualityGrade: 'F',
  placement: 'archive',
  seed: 'radial-pulse-001',
  interaction: 'time',
  visualPrimitive: 'lines',
  visualDirection: 'minimal-graphic',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is the strict time-staggered ring lifecycle with no secondary ornament.',
  reference: 'Swiss poster motion study',
  antiReference: 'music visualizer tunnel',
  description: 'Thin rings expand from the center and fade out on a black field.',
  constraints: ['no new assets', '11 ring meshes', 'one dominant expanding motion'],
  performanceBudget: '11 ring meshes, basic materials, no postprocessing',
  mobilePolicy: 'required: same ring count on mobile with capped DPR',
  motionComfort: 'low risk: slow expansion with no flashing; freeze rings when reduced motion is requested',
  rubric: { clarity: 1, novelty: 1, performance: 2, implementation: 2, taste: 1, total: 7 },
  verdict: 'Failed/archive: too plain to justify itself; it reads as placeholder pulse graphics.',
}
