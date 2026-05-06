import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'wire-terrain',
  title: 'Wire Terrain',
  status: 'failed',
  qualityGrade: 'F',
  placement: 'archive',
  seed: 'wire-terrain-001',
  interaction: 'time',
  visualPrimitive: 'lines',
  visualDirection: 'arcade-vector',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is the topographic read built from a very small moving wire grid.',
  reference: 'vector terrain horizon plot',
  antiReference: 'generic infinite grid floor',
  description: 'A sparse wire terrain scrolls forward like a topographic vector plot.',
  constraints: ['no new assets', '272 line segments', 'one line geometry'],
  performanceBudget: '272 line segments, one geometry update per frame, one material, no postprocessing',
  mobilePolicy: 'required: same wire count on mobile with capped DPR',
  motionComfort: 'medium risk: forward field movement; freeze scroll when reduced motion is requested',
  rubric: { clarity: 1, novelty: 1, performance: 2, implementation: 2, taste: 1, total: 7 },
  verdict: 'Failed/archive: the topographic intent did not land and should not stay in the main gallery.',
}
