import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'phase-lock',
  title: 'Phase Lock',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'phase-lock-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'terminal-diagnostic',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is making two traces visibly lock and drift out of phase as the whole composition rule.',
  reference: 'dual signal phase monitor',
  antiReference: 'music waveform screensaver',
  description: 'Two diagnostic traces drift in and out of phase with a lock band appearing at alignment.',
  constraints: ['no new assets', 'single fullscreen shader', 'two traces only'],
  performanceBudget: 'one fullscreen plane, two analytic traces, no postprocessing',
  mobilePolicy: 'required: same traces on mobile with capped DPR',
  motionComfort: 'low: smooth phase drift; freeze phase when reduced motion is requested',
  rubric: { clarity: 3, novelty: 3, performance: 5, implementation: 4, taste: 3, total: 18 },
  verdict: 'Prototype after user grading: restrained and clear enough to keep, but not strong yet.',
}
