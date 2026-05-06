import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'tunnel-lines',
  title: 'Tunnel Lines',
  status: 'failed',
  qualityGrade: 'F',
  placement: 'archive',
  seed: 'tunnel-lines-001',
  interaction: 'time',
  visualPrimitive: 'lines',
  visualDirection: 'arcade-vector',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is the disciplined rectangular depth cadence rather than a generic particle tunnel.',
  reference: 'early vector arcade tunnel',
  antiReference: 'neon music visualizer vortex',
  description: 'Rectangular line frames advance through a simple vector tunnel.',
  constraints: ['no new assets', 'one line-segments geometry', 'seeded ring offsets only'],
  performanceBudget: '24 rings, 96 line segments, one material, no postprocessing',
  mobilePolicy: 'required: same line count on mobile with capped DPR',
  motionComfort: 'medium risk: forward depth motion; freeze ring travel when reduced motion is requested',
  rubric: { clarity: 1, novelty: 1, performance: 2, implementation: 2, taste: 1, total: 7 },
  verdict: 'Failed/archive: readable but generic, and the arcade-vector reference lands as a weak stock tunnel.',
}
