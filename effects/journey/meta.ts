import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'journey',
  title: 'Journey Archive',
  status: 'failed',
  qualityGrade: 'F',
  placement: 'archive',
  seed: 'journey-archive-001',
  interaction: 'time',
  visualPrimitive: 'mixed',
  visualDirection: 'lo-fi-webgl',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is the archive decision: preserve the plane-journey attempt as a labeled failure instead of hiding it.',
  reference: 'low-poly airplane sketch kept as a postmortem',
  antiReference: 'fake cinematic cloud-flight scene',
  description: 'A minimal airplane sketch marks the previous journey scene as archived failed work.',
  constraints: ['no new assets', 'no volumetric clouds in the registry route', 'no FPS counter or Leva controls'],
  performanceBudget: 'under 12 meshes, basic materials, no shader clouds, no postprocessing',
  mobilePolicy: 'required: same small mesh count on mobile',
  motionComfort: 'low risk: slight lateral plane drift; freeze motion when reduced motion is requested',
  rubric: { clarity: 1, novelty: 1, performance: 2, implementation: 2, taste: 1, total: 7 },
  verdict: 'Failed/archive: the original direction was overbuilt and generic; this route keeps the lesson accessible without pretending it is a finished effect.',
}
