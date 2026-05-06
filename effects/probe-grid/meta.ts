import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'probe-grid',
  title: 'Probe Grid',
  status: 'solid',
  qualityGrade: 'B',
  placement: 'main',
  seed: 'probe-grid-001',
  interaction: 'time+cursor',
  visualPrimitive: 'shader',
  visualDirection: 'scientific-diagram',
  noveltyAxis: 'interaction',
  noveltyClaim: 'The novelty is a cursor-bent grid treated as an instrument probe rather than a decorative warp.',
  reference: 'oscilloscope calibration grid with probe crosshair',
  antiReference: 'generic green cyber grid',
  description: 'A measurement grid bends around the cursor probe with crosshair ticks and a target ring.',
  constraints: ['no new assets', 'single fullscreen shader', 'cursor optional'],
  performanceBudget: 'one fullscreen plane, analytic grid math, no geometry updates',
  mobilePolicy: 'required: same composition; touch position maps to probe when available',
  motionComfort: 'low risk: slow tick drift; freeze ticks when reduced motion is requested',
  rubric: { clarity: 4, novelty: 3, performance: 5, implementation: 4, taste: 4, total: 20 },
  verdict: 'Solid after user grading: failed polish pass was reverted; simpler B version remains the keeper.',
}
