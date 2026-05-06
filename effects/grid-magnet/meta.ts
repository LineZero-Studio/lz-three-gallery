import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'grid-magnet',
  title: 'Grid Magnet',
  status: 'solid',
  qualityGrade: 'B',
  placement: 'main',
  seed: 'grid-magnet-001',
  interaction: 'time+cursor',
  visualPrimitive: 'shader',
  visualDirection: 'material-abstraction',
  noveltyAxis: 'mixed',
  noveltyClaim: 'The novelty is combining liquid-grid structure with magnetic cursor bending.',
  reference: 'cursor-bent instrument grid',
  antiReference: 'generic mouse distortion shader',
  description: 'A structured grid bends toward a magnetic cursor target.',
  constraints: ['no new assets', 'one shader plane', 'cursor optional'],
  performanceBudget: 'one full-screen shader plane, no textures, no postprocessing',
  mobilePolicy: 'reduced: grid stays readable without precise cursor input',
  motionComfort: 'low risk: local cursor bend; freeze drift when reduced motion is requested',
  rubric: { clarity: 4, novelty: 4, performance: 5, implementation: 4, taste: 4, total: 21 },
  verdict: 'Solid: cool after grading; combines liquid-grid and magnetic-field signals without adding assets.',
}
