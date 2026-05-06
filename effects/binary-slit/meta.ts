import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'binary-slit',
  title: 'Binary Slit',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'binary-slit-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'terminal-diagnostic',
  noveltyAxis: 'composition',
  noveltyClaim: 'The novelty is a readable data slit where barcode lanes only fully resolve through one central aperture.',
  reference: 'Ryoji Ikeda-style barcode perception test',
  antiReference: 'random TV static',
  description: 'Binary lanes crawl behind a central slit while a blue scanline tests the field.',
  constraints: ['no new assets', 'single fullscreen shader', 'deterministic binary cells'],
  performanceBudget: 'one fullscreen plane, analytic cells, no textures',
  mobilePolicy: 'required: same lane count on mobile with capped DPR',
  motionComfort: 'medium: barcode crawl and scanline; freeze when reduced motion is requested',
  rubric: { clarity: 3, novelty: 3, performance: 5, implementation: 4, taste: 3, total: 18 },
  verdict: 'Prototype after user grading: the diagnostic direction is useful, but this version needs polish.',
}
