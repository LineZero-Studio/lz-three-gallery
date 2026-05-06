import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'scan-grid',
  title: 'Scan Grid',
  status: 'failed',
  qualityGrade: 'F',
  placement: 'archive',
  seed: 'scan-grid-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'terminal-diagnostic',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is the single scanning band exposing a restrained diagnostic grid.',
  reference: 'monochrome terminal scanner',
  antiReference: 'busy cyberpunk HUD',
  description: 'A monochrome grid is swept by a slow diagnostic scan band.',
  constraints: ['no new assets', 'one shader plane', 'two grid scales plus one scan band'],
  performanceBudget: 'one full-screen plane, short fragment shader, no postprocessing',
  mobilePolicy: 'required: same shader on mobile with capped DPR',
  motionComfort: 'low risk: slow scan band; freeze band when reduced motion is requested',
  rubric: { clarity: 1, novelty: 1, performance: 2, implementation: 2, taste: 1, total: 7 },
  verdict: 'Failed/archive: the scan reads as expected filler and should leave the main gallery.',
}
