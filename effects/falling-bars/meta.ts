import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'falling-bars',
  title: 'Falling Bars',
  status: 'solid',
  qualityGrade: 'B',
  placement: 'main',
  seed: 'falling-bars-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'optical-print',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is treating falling motion as a screenprint bar system instead of physics.',
  reference: 'animated barcode screenprint',
  antiReference: 'Matrix code rain',
  description: 'Red print bars fall through a cream poster grid with seeded column timing.',
  constraints: ['no new assets', 'one shader plane', 'seeded column timing'],
  performanceBudget: 'one full-screen plane, short fragment shader, no postprocessing',
  mobilePolicy: 'required: same shader on mobile with capped DPR',
  motionComfort: 'low risk: vertical drift only; freeze falling phase when reduced motion is requested',
  rubric: { clarity: 4, novelty: 3, performance: 5, implementation: 4, taste: 4, total: 20 },
  verdict: 'Solid: still cool and should stay high in main.',
}
