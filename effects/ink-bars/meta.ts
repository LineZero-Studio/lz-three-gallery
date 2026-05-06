import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'ink-bars',
  title: 'Ink Bars',
  status: 'solid',
  qualityGrade: 'B',
  placement: 'main',
  seed: 'ink-bars-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'optical-print',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is a more poster-like falling-bars variant with overprint rhythm.',
  reference: 'screenprinted moving bar poster',
  antiReference: 'Matrix code rain',
  description: 'Seeded red ink bars fall through a cream overprint poster system.',
  constraints: ['no new assets', 'one shader plane', 'seeded columns'],
  performanceBudget: 'one full-screen shader plane, no textures, no postprocessing',
  mobilePolicy: 'required: same shader on mobile with capped DPR',
  motionComfort: 'low risk: slow vertical bar drift; freeze phase when reduced motion is requested',
  rubric: { clarity: 4, novelty: 3, performance: 5, implementation: 4, taste: 4, total: 20 },
  verdict: 'Solid: cool after grading; directly builds from the falling-bars winner with stronger print language.',
}
