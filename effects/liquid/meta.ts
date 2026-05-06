import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'liquid',
  title: 'Liquid Topography',
  status: 'showcase',
  qualityGrade: 'A',
  placement: 'main',
  seed: 'liquid-topography-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'material-abstraction',
  noveltyAxis: 'technique',
  noveltyClaim: 'The novelty is the inherited design-testing liquid surface defaults preserved without debug UI.',
  reference: 'slow liquid contour map',
  antiReference: 'muddy procedural surface demo',
  description: 'The design-testing liquid topography defaults rendered as a top reference effect.',
  constraints: ['no new assets', 'single shader plane', 'design-testing defaults', 'no Leva controls in the registry route'],
  performanceBudget: 'one 50x50 plane, one shader material, no postprocessing, capped DPR',
  mobilePolicy: 'required: same shader plane with capped DPR',
  motionComfort: 'low risk: slow lateral contour drift; freezes when reduced motion is requested',
  rubric: { clarity: 5, novelty: 4, performance: 4, implementation: 5, taste: 5, total: 23 },
  verdict: 'Showcase: still the top reference alongside magnetic-field after grading.',
}