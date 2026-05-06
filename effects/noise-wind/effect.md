# Noise Wind

## Contract

- Slug: `noise-wind`
- Seed: `noise-wind-001`
- Status: `failed`
- Grade: `F`
- Placement: `archive`

## Idea

Thin seeded contour streaks drift like a measured wind field.

## Novelty

- Claim: The novelty is a liquid-adjacent contour field pushed into wind-map language.
- Axis: `technique`

## Visual Direction

- Primary: `scientific-diagram`
- Qualifier: `wind contour field`
- Reference: `scientific wind contour map`
- Anti-reference: `screensaver noise wash`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#040706`, `#66efba`, `#d6ffdb`
- Motion rule: Contour bands drift slowly along a dominant wind vector.
- Dominant parameter: `windVector`

## Constraints

- Performance budget: one full-screen shader plane, four fbm octaves, capped DPR, no postprocessing.
- Mobile policy: `required`: same shader on mobile with capped DPR.
- Motion comfort: `low`: slow lateral drift; freeze shader time when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Keep line contours sparse so the wind-map read survives without labels.
- Motion decision: One slow directional drift; no camera movement.
- Interaction decision: No cursor wind because the field should stand as a composition.
- Simplification pass: Used value-noise contours instead of a long fluid shader.

## Rubric

- Clarity: `1`
- Novelty: `1`
- Performance: `2`
- Implementation: `2`
- Taste: `1`
- Total: `7`

## Verdict

Failed/archive. The liquid-adjacent intent did not land and the effect should not stay in main.

## Decision Log

- `2026-05-04`: Created after grading showed liquid-style material fields as the strongest direction.
- `2026-05-04`: Archived after explicit project grading.
