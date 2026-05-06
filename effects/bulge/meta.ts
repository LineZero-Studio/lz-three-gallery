import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'bulge',
  title: 'Bulge Study',
  status: 'failed',
  qualityGrade: 'F',
  placement: 'archive',
  seed: 'bulge-study-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'shader-study',
  noveltyAxis: 'technique',
  noveltyClaim: 'The novelty is the direct generated grid deformation without image or video texture support.',
  reference: 'printed calibration sheet bending under pressure',
  antiReference: 'asset-backed scroll demo with hidden media',
  description: 'A generated calibration grid ripples from the center as a rough bulge prototype.',
  constraints: ['no new assets', 'no texture dependency in the registry route', 'single deformed plane'],
  performanceBudget: 'one 48x48 plane, one short shader pair, no postprocessing',
  mobilePolicy: 'required: same plane and shader on mobile',
  motionComfort: 'low risk: small displacement; freeze time when reduced motion is requested',
  rubric: { clarity: 1, novelty: 1, performance: 2, implementation: 2, taste: 1, total: 7 },
  verdict: 'Failed/archive: the generated-grid replacement removed the asset problem but did not produce a good effect.',
}
