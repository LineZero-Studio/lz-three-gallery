import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'liquid-grid',
  title: 'Liquid Grid',
  status: 'solid',
  qualityGrade: 'B',
  placement: 'main',
  seed: 'liquid-grid-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'material-abstraction',
  noveltyAxis: 'technique',
  noveltyClaim: 'The novelty is a structured grid with liquid warp instead of organic terrain.',
  reference: 'warped grid material study',
  antiReference: 'organic liquid terrain',
  description: 'A structured grid warps like a material surface under tension.',
  constraints: ['no new assets', 'one shader plane', 'coarse plus fine grid layers'],
  performanceBudget: 'one full-screen shader plane, no postprocessing, capped DPR',
  mobilePolicy: 'required: same shader on mobile with capped DPR',
  motionComfort: 'low risk: slow warp animation; freeze when reduced motion is requested',
  rubric: { clarity: 4, novelty: 3, performance: 5, implementation: 4, taste: 5, total: 21 },
  verdict: 'Solid: promoted to cool after grading; stays in the material family but different enough from liquid.',
}