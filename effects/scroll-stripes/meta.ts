import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'scroll-stripes',
  title: 'Scroll Stripes',
  status: 'failed',
  qualityGrade: 'F',
  placement: 'archive',
  seed: 'scroll-stripes-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'optical-print',
  noveltyAxis: 'technique',
  noveltyClaim: 'The novelty is a clean stripe pattern with wave distortion instead of sorted/glitch bands.',
  reference: 'animated screenprint stripes',
  antiReference: 'pixel sort glitch',
  description: 'Clean striped pattern drifts with subtle wave distortion like animated screenprint.',
  constraints: ['no new assets', 'one shader plane', 'no textures'],
  performanceBudget: 'one full-screen shader plane, no postprocessing, capped DPR',
  mobilePolicy: 'required: same shader on mobile with capped DPR',
  motionComfort: 'low risk: slow stripe drift; freeze motion when reduced motion is requested',
  rubric: { clarity: 3, novelty: 2, performance: 5, implementation: 4, taste: 2, total: 16 },
  verdict: 'Failed/archive: weak after grading, not worth keeping in main.',
}