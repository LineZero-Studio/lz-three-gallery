import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'noise-wind',
  title: 'Noise Wind',
  status: 'failed',
  qualityGrade: 'F',
  placement: 'archive',
  seed: 'noise-wind-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'scientific-diagram',
  noveltyAxis: 'technique',
  noveltyClaim: 'The novelty is a liquid-adjacent contour field pushed into wind-map language.',
  reference: 'scientific wind contour map',
  antiReference: 'screensaver noise wash',
  description: 'Thin seeded contour streaks drift like a measured wind field.',
  constraints: ['no new assets', 'one shader plane', 'no postprocessing'],
  performanceBudget: 'one full-screen shader plane, four fbm octaves, capped DPR, no postprocessing',
  mobilePolicy: 'required: same shader on mobile with capped DPR',
  motionComfort: 'low risk: slow lateral drift; freeze shader time when reduced motion is requested',
  rubric: { clarity: 1, novelty: 1, performance: 2, implementation: 2, taste: 1, total: 7 },
  verdict: 'Failed/archive: the liquid-adjacent intent did not land and should not stay in main.',
}
