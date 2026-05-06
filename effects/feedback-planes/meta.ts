import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'feedback-planes',
  title: 'Feedback Planes',
  status: 'failed',
  qualityGrade: 'F',
  placement: 'archive',
  seed: 'feedback-planes-001',
  interaction: 'time',
  visualPrimitive: 'planes',
  visualDirection: 'shader-study',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is translucent receding planes with color hints instead of solid surface terrain.',
  reference: 'fade-forward translucent planes',
  antiReference: 'solid 3D terrain demo',
  description: 'Translucent color-tinted planes recede and fade like a feedback loop.',
  constraints: ['no new assets', '18 instanced planes', 'one material'],
  performanceBudget: '18 instanced planes, one matrix update per plane, one material, no postprocessing',
  mobilePolicy: 'required: same plane count on mobile with capped DPR',
  motionComfort: 'medium risk: forward depth motion; freeze z travel when reduced motion is requested',
  rubric: { clarity: 2, novelty: 2, performance: 4, implementation: 3, taste: 2, total: 13 },
  verdict: 'Failed/archive: not strong enough to stay in main after grading.',
}