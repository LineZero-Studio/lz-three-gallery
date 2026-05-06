import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'reaction-poster',
  title: 'Reaction Poster',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'reaction-poster-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'material-abstraction',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is a reaction-diffusion-looking poster made without simulation or feedback.',
  reference: 'reaction-diffusion screenprint poster',
  antiReference: 'muddy procedural marble',
  description: 'A bounded poster field uses thresholded waves to suggest reaction-diffusion islands.',
  constraints: ['no new assets', 'single fullscreen shader', 'non-iterative pattern only'],
  performanceBudget: 'one fullscreen plane, trigonometric field only, no feedback buffers',
  mobilePolicy: 'required: same poster bounds and pattern density on mobile',
  motionComfort: 'low: slow field drift; freeze drift when reduced motion is requested',
  rubric: { clarity: 3, novelty: 3, performance: 5, implementation: 4, taste: 3, total: 18 },
  verdict: 'Prototype after user grading: promising poster language, but not strong enough for the solid set.',
}
