import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'wave-curtain',
  title: 'Wave Curtain',
  status: 'failed',
  qualityGrade: 'F',
  placement: 'archive',
  seed: 'wave-curtain-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'material-abstraction',
  noveltyAxis: 'technique',
  noveltyClaim: 'The novelty is a single folded stripe surface rather than a simulated fabric scene.',
  reference: 'abstract folded textile sample',
  antiReference: 'realistic curtain render',
  description: 'A striped plane folds in shallow waves like an abstract material sample.',
  constraints: ['no new assets', 'one 48x36 plane', 'one shader material'],
  performanceBudget: 'one segmented plane, short shader pair, no lights, no postprocessing',
  mobilePolicy: 'required: same plane on mobile with capped DPR',
  motionComfort: 'low risk: slow lateral folds; freeze shader time when reduced motion is requested',
  rubric: { clarity: 1, novelty: 1, performance: 2, implementation: 2, taste: 1, total: 7 },
  verdict: 'Failed/archive: weak enough to leave the main gallery.',
}
