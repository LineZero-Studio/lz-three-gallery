# Reaction Poster

## Contract

- Slug: `reaction-poster`
- Seed: `reaction-poster-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

A bounded poster field uses thresholded waves to suggest reaction-diffusion islands.

## Novelty

- Claim: The novelty is a reaction-diffusion-looking poster made without simulation or feedback.
- Axis: `composition`

## Visual Direction

- Primary: `material-abstraction`
- Qualifier: `reaction poster approximation`
- Reference: `reaction-diffusion screenprint poster`
- Anti-reference: `muddy procedural marble`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#080604`, `#e3d1a8`, `#c21a12`, `#142e52`
- Motion rule: A thresholded field drifts inside a fixed poster border.
- Dominant parameter: `thresholdBand`

## Constraints

- Performance budget: One fullscreen plane, trigonometric field only, no feedback buffers.
- Mobile policy: `required`: same poster bounds and pattern density on mobile.
- Motion comfort: `low`: slow field drift; freeze drift when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Poster border keeps the procedural field from filling the page aimlessly.
- Motion decision: Drift is slow because the pattern is dense.
- Interaction decision: Time-only; no cursor because it is a material poster study.
- Simplification pass: Explicitly avoided real iterative reaction-diffusion.

## Rubric

- Clarity: `3`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `3`
- Total: `18`

## Verdict

Prototype after user grading. Promising poster language, but not strong enough for the solid set.

## Decision Log

- `2026-05-05`: Created for batch 3 as the riskiest biological/material direction.
- `2026-05-05`: User grading kept this at `prototype` / `C`.
