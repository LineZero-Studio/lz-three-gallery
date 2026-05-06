import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'signal-cut',
  title: 'Signal Cut',
  status: 'prototype',
  qualityGrade: 'D',
  placement: 'archive',
  seed: 'signal-cut-001',
  interaction: 'time',
  visualPrimitive: 'planes',
  visualDirection: 'editorial-motion',
  noveltyAxis: 'mixed',
  noveltyClaim: 'The novelty is rebuilding measurement language with print cuts instead of terminal-green diagnostics.',
  reference: 'printed signal chart cropped through editorial blocks',
  antiReference: 'generic green terminal scanner',
  description: 'A signal trace is interrupted by hard print blocks, ticks, and crop cuts in an editorial palette.',
  constraints: ['no new assets', 'flat planes only', 'diagnostic marks without terminal-green styling'],
  performanceBudget: 'under 80 flat planes, no custom shaders, no postprocessing',
  mobilePolicy: 'required: same chart with fixed geometry',
  motionComfort: 'low risk: slow signal drift; freeze drift when reduced motion is requested',
  rubric: { clarity: 2, novelty: 2, performance: 5, implementation: 4, taste: 1, total: 14 },
  verdict: 'Prototype/D: weak after user grading; archived so it does not appear in Keepers.',
}
