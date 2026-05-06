# Scope Trace

## Contract

- Slug: `scope-trace`
- Seed: `scope-trace-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

A phosphor trace and ghost line sweep across a calibration grid.

## Novelty

- Claim: The novelty is a minimal oscilloscope with cursor-controlled amplitude and trigger marker.
- Axis: `interaction`

## Visual Direction

- Primary: `terminal-diagnostic`
- Qualifier: `phosphor scope trace`
- Reference: `phosphor oscilloscope calibration trace`
- Anti-reference: `audio visualizer equalizer`

## Inputs

- Interaction: `time+cursor`
- Primitive: `shader`
- Palette: `#010605`, `#5eff9e`, `#ffb84d`
- Motion rule: A waveform sweeps horizontally while a delayed ghost trace follows it.
- Dominant parameter: `traceAmplitude`

## Constraints

- Performance budget: One fullscreen plane, analytic wave traces, no postprocessing.
- Mobile policy: `required`: same trace; touch controls amplitude and trigger when available.
- Motion comfort: `low`: smooth horizontal trace; freeze sweep when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: The grid and axes make this read as an instrument, not a music visualizer.
- Motion decision: The trace is smooth and narrow with one ghost line.
- Interaction decision: Cursor controls amplitude and trigger marker only.
- Simplification pass: Avoided labels and chromatic glow.

## Rubric

- Clarity: `3`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `3`
- Total: `18`

## Verdict

Prototype after user grading. The oscilloscope read is there, but it is not a solid keeper yet.

## Decision Log

- `2026-05-05`: Created for batch 2 to explore instrument display language.
- `2026-05-05`: User grading set this to `prototype` / `C`.
