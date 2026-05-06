import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'cell-membrane',
  title: 'Cell Membrane',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'cell-membrane-001',
  interaction: 'time',
  visualPrimitive: 'shader',
  visualDirection: 'material-abstraction',
  noveltyAxis: 'technique',
  noveltyClaim: 'The novelty is a crisp Voronoi membrane material with minimal organic wobble.',
  reference: 'microscopy cell membrane diagram',
  antiReference: 'lava lamp blobs',
  description: 'A field of crisp membrane cells wobbles like a restrained microscopy diagram.',
  constraints: ['no new assets', 'single fullscreen shader', '3x3 Voronoi neighborhood'],
  performanceBudget: 'one fullscreen plane, nine-neighbor analytic Voronoi, no textures',
  mobilePolicy: 'required: same cell density on mobile with capped DPR',
  motionComfort: 'low: subtle membrane wobble; freeze wobble when reduced motion is requested',
  rubric: { clarity: 3, novelty: 3, performance: 4, implementation: 4, taste: 3, total: 17 },
  verdict: 'Prototype after user grading: organic and readable, but needs a stronger second pass.',
}
