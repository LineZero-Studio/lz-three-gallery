# Magnetic Field

## Contract

- Slug: `magnetic-field`
- Seed: `magnetic-field-001`
- Status: `showcase`
- Grade: `A`
- Placement: `main`

## Idea

Seeded points bend toward a magnetic target like a measurement diagram.

## Novelty

- Claim: The novelty is a magnetic-field diagram with concentric target rings instead of toy-like particle attraction.
- Axis: `interaction`

## Visual Direction

- Primary: `scientific-diagram`
- Qualifier: `magnetic field measurement plot`
- Reference: `magnetic field measurement plot`
- Anti-reference: `generic mouse particle toy`

## Inputs

- Interaction: `time+cursor`
- Primitive: `points`
- Palette: `#07080c`, `#a8d9ff`, `#ffffff`, `#4a9eff`
- Motion rule: Points pull toward a magnetic cursor target while maintaining a seeded origin drift.
- Dominant parameter: `magneticStrength`

## Constraints

- Performance budget: 180 points, one attribute update per frame, no postprocessing.
- Mobile policy: `reduced`: without precise cursor the field remains readable as a static plot.
- Motion comfort: `low`: local field pull; freeze drift and attraction when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: The concentric rings at the cursor target give it the measurement-diagram read.
- Motion decision: Field pull only; no trails or complex physics.
- Interaction decision: Cursor maps to magnetic center with two visible rings for scale context.
- Simplification pass: Kept points count reasonable and used no per-point React state.

## Rubric

- Clarity: `5`
- Novelty: `5`
- Performance: `5`
- Implementation: `4`
- Taste: `5`
- Total: `24`

## Verdict

Showcase. The new best effect; scientific-diagram language with concentric rings is distinct and immediately readable.

## Decision Log

- `2026-05-04`: Created as a scientific-diagram interaction candidate after cursor-gravity graded as cool.
- `2026-05-04`: Promoted to showcase after explicit project grading.