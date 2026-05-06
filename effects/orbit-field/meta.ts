import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'orbit-field',
  title: 'Orbit Field',
  status: 'failed',
  qualityGrade: 'F',
  placement: 'archive',
  seed: 'orbit-field-001',
  interaction: 'time+cursor',
  visualPrimitive: 'points',
  visualDirection: 'scientific-diagram',
  noveltyAxis: 'mixed',
  noveltyClaim: 'The novelty is a cursor-positioned orbit diagram instead of free-floating orbit dots.',
  reference: 'portable orrery measurement target',
  antiReference: 'random orbital screensaver',
  description: 'Nested point orbits follow a cursor target like a movable measurement instrument.',
  constraints: ['no new assets', '160 points', '5 guide rings'],
  performanceBudget: '160 points, five ring meshes, one attribute update per frame, no postprocessing',
  mobilePolicy: 'reduced: centered orbit field remains readable without cursor precision',
  motionComfort: 'low risk: slow orbital motion; freeze orbit phase when reduced motion is requested',
  rubric: { clarity: 1, novelty: 1, performance: 2, implementation: 2, taste: 1, total: 7 },
  verdict: 'Failed/archive: the orbit rescue did not work and should leave the main gallery.',
}
