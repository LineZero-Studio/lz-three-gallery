# Cursor Gravity

## Contract

- Slug: `cursor-gravity`
- Seed: `cursor-gravity-001`
- Status: `solid`
- Grade: `B`
- Placement: `main`

## Idea

Seeded points bend toward the cursor like a small gravity-lens diagram.

## Novelty

- Claim: The novelty is a measured attraction field that still reads without cursor movement.
- Axis: `interaction`

## Visual Direction

- Primary: `scientific-diagram`
- Qualifier: `gravity lens plot`
- Reference: `gravity lens particle plot`
- Anti-reference: `generic mouse particle toy`

## Inputs

- Interaction: `time+cursor`
- Primitive: `points`
- Palette: `#080710`, `#ffdf7a`, `#ff6b9a`
- Motion rule: Points keep seeded base positions and bend toward one cursor target.
- Dominant parameter: `pullStrength`

## Constraints

- Performance budget: 220 points, one attribute update per frame, no postprocessing.
- Mobile policy: `reduced`: without precise cursor the seeded field remains readable as a still plot.
- Motion comfort: `low`: local pull only; freeze drift and attraction when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: The seeded field is evenly spread so the cursor pull has context.
- Motion decision: Tiny drift plus one attraction rule only.
- Interaction decision: Cursor maps directly to one gravity target.
- Simplification pass: No trails, no color cycling, no per-point React state.

## Rubric

- Clarity: `4`
- Novelty: `4`
- Performance: `5`
- Implementation: `3`
- Taste: `4`
- Total: `20`

## Verdict

Solid. The cursor interaction reads as cool and should stay high in main.

## Decision Log

- `2026-05-04`: Created as an interaction candidate after orbit/particle fields graded as decent starts.
- `2026-05-04`: Promoted to cool/solid after explicit project grading.
