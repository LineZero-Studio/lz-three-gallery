import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: 'scope-trace',
  title: 'Scope Trace',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: 'scope-trace-001',
  interaction: 'time+cursor',
  visualPrimitive: 'shader',
  visualDirection: 'terminal-diagnostic',
  noveltyAxis: 'interaction',
  noveltyClaim: 'The novelty is a minimal oscilloscope with cursor-controlled amplitude and trigger marker.',
  reference: 'phosphor oscilloscope calibration trace',
  antiReference: 'audio visualizer equalizer',
  description: 'A phosphor trace and ghost line sweep across a calibration grid.',
  constraints: ['no new assets', 'single fullscreen shader', 'cursor optional'],
  performanceBudget: 'one fullscreen plane, analytic wave traces, no postprocessing',
  mobilePolicy: 'required: same trace; touch controls amplitude and trigger when available',
  motionComfort: 'low: smooth horizontal trace; freeze sweep when reduced motion is requested',
  rubric: { clarity: 3, novelty: 3, performance: 5, implementation: 4, taste: 3, total: 18 },
  verdict: 'Prototype after user grading: the oscilloscope read is there, but it is not a solid keeper yet.',
}
