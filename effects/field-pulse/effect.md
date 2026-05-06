# Field Pulse

## Contract

- Slug: `field-pulse`
- Seed: `field-pulse-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

Sparse seeded particles brighten as measured pulse rings pass from the cursor target.

## Novelty

- Claim: The novelty is a magnetic target expressed through sparse pulse rings and sampled particles.
- Axis: `interaction`

## Visual Direction

- Primary: `scientific-diagram`
- Qualifier: `field pulse measurement`
- Reference: `field probe pulse diagram`
- Anti-reference: `particle explosion visualizer`

## Inputs

- Interaction: `time+cursor`
- Primitive: `shader`
- Palette: `#05040a`, `#ffbf52`, `#ff407a`, `#fff0c2`
- Motion rule: Two pulse rings expand from the cursor and brighten nearby sampled particles.
- Dominant parameter: `pulseRadius`

## Constraints

- Performance budget: One fullscreen plane, analytic rings and cell dots, no buffers.
- Mobile policy: `required`: same composition; touch maps to pulse target when available.
- Motion comfort: `medium-low`: expanding rings; freeze pulse phase when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Deterministic sparse cells keep the field from becoming particle noise.
- Motion decision: Pulses are slow and measured, not explosive.
- Interaction decision: Cursor is the emitting probe and is visible through target rings.
- Simplification pass: Shader particles avoid managing another point buffer.

## Rubric

- Clarity: `3`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `3`
- Total: `18`

## Verdict

Prototype after user grading. The pulse language reads, but the result is not strong enough yet.

## Decision Log

- `2026-05-05`: Created for batch 1 as a pulse-ring companion to magnetic-field and cursor-gravity.
- `2026-05-05`: User grading set this to `prototype` / `C`.
