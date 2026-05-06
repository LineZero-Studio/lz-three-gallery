# Soft Blobs

## Contract

- Slug: `soft-blobs`
- Seed: `soft-blobs-001`
- Status: `prototype`
- Grade: `D`
- Placement: `archive`

## Idea

Seven seeded blobs merge into a soft flat material study.

## Novelty

- Claim: The novelty is a tiny seeded metaball field kept as a flat material sample.
- Axis: `technique`

## Visual Direction

- Primary: `material-abstraction`
- Qualifier: `gel ink sample`
- Reference: `soft gel ink study`
- Anti-reference: `lava lamp screensaver`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#0b0910`, `#8a59ff`, `#73ffb8`
- Motion rule: Seven seeded blob centers drift in small loops and merge through a thresholded field.
- Dominant parameter: `blobThreshold`

## Constraints

- Performance budget: one full-screen shader plane, seven fixed blob evaluations, no postprocessing.
- Mobile policy: `required`: same shader on mobile with capped DPR.
- Motion comfort: `low`: slow orbital drift; freeze blob phase when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Keep blob count low so the form remains legible.
- Motion decision: Small seeded loops only; no fluid simulation.
- Interaction decision: No cursor push yet because the base composition needs to prove itself.
- Simplification pass: No raymarching, no blur pass, no postprocessing.

## Rubric

- Clarity: `2`
- Novelty: `2`
- Performance: `3`
- Implementation: `2`
- Taste: `1`
- Total: `10`

## Verdict

Prototype/D. Weak and buggy; archived during consolidation until rebuilt.

## Decision Log

- `2026-05-04`: Created as a material-abstraction candidate after Liquid Topography graded best.
- `2026-05-04`: Regraded as weak and buggy after explicit project grading.
- `2026-05-05`: Moved to archive during quality consolidation.
