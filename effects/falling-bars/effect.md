# Falling Bars

## Contract

- Slug: `falling-bars`
- Seed: `falling-bars-001`
- Status: `solid`
- Grade: `B`
- Placement: `main`

## Idea

Red print bars fall through a cream poster grid with seeded column timing.

## Novelty

- Claim: The novelty is treating falling motion as a screenprint bar system instead of physics.
- Axis: `composition`

## Visual Direction

- Primary: `optical-print`
- Qualifier: `barcode screenprint`
- Reference: `animated barcode screenprint`
- Anti-reference: `Matrix code rain`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#f2deba`, `#d12214`, `#0a0908`
- Motion rule: Each column drops a masked bar at a seeded speed.
- Dominant parameter: `columnSpeed`

## Constraints

- Performance budget: one full-screen plane, short fragment shader, no postprocessing.
- Mobile policy: `required`: same shader on mobile with capped DPR.
- Motion comfort: `low`: vertical drift only; freeze falling phase when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Poster colors and wide columns avoid a terminal-code read.
- Motion decision: Only the bar y-phase moves per column.
- Interaction decision: No interaction; the optical-print rhythm is the effect.
- Simplification pass: Removed extra colors and noise texture logic.

## Rubric

- Clarity: `4`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `4`
- Total: `20`

## Verdict

Solid. Still cool and should stay high in main.

## Decision Log

- `2026-05-04`: Created as batch 2 effect with seeded shader column timing.
- `2026-05-04`: Promoted to cool/solid after explicit project grading.
- `2026-05-04`: Confirmed cool after latest project grading.
