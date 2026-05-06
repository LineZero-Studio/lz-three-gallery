# Particle Rain

## Contract

- Slug: `particle-rain`
- Seed: `particle-rain-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

Sparse vertical strokes fall through depth like an instrument rain trace.

## Novelty

- Claim: The novelty is sparse depth-coded rain strokes rather than dense particle weather.
- Axis: `composition`

## Visual Direction

- Primary: `terminal-diagnostic`
- Qualifier: `precipitation trace`
- Reference: `instrument precipitation trace`
- Anti-reference: `generic blue particle rain`

## Inputs

- Interaction: `time`
- Primitive: `lines`
- Palette: `#05090d`, `#83c7ff`
- Motion rule: Each seeded stroke falls vertically and wraps to the top.
- Dominant parameter: `dropSpeed`

## Constraints

- Performance budget: 130 line segments, one geometry update per frame, one material, no postprocessing.
- Mobile policy: `required`: same stroke count on mobile with capped DPR.
- Motion comfort: `low`: slow downward motion; freeze drops when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Kept the field sparse to avoid generic particle weather.
- Motion decision: One vertical wrap motion with seeded speeds.
- Interaction decision: No cursor wind or camera motion.
- Simplification pass: Lines instead of points so the falling direction reads faster.

## Rubric

- Clarity: `3`
- Novelty: `2`
- Performance: `5`
- Implementation: `4`
- Taste: `3`
- Total: `17`

## Verdict

Prototype. Readable and restrained, but still close to generic rain unless pushed harder in a later pass.

## Decision Log

- `2026-05-04`: Created as batch 2 effect with seeded rain strokes.
- `2026-05-04`: Confirmed as a decent start after explicit project grading.
