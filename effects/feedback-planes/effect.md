# Feedback Planes

## Contract

- Slug: `feedback-planes`
- Seed: `feedback-planes-001`
- Status: `failed`
- Grade: `F`
- Placement: `archive`

## Idea

Translucent color-tinted planes recede and fade like a feedback loop.

## Novelty

- Claim: The novelty is translucent receding planes with color hints instead of solid surface terrain.
- Axis: `composition`

## Visual Direction

- Primary: `shader-study`
- Qualifier: `translucent fade-forward planes`
- Reference: `fade-forward translucent planes`
- Anti-reference: `solid 3D terrain demo`

## Inputs

- Interaction: `time`
- Primitive: `planes`
- Palette: `#08080a`, varying HSL tints
- Motion rule: Each translucent plane recedes through z and fades as it gets farther.
- Dominant parameter: `planeDepthSpeed`

## Constraints

- Performance budget: 18 instanced planes, one matrix update per plane, one material, no postprocessing.
- Mobile policy: `required`: same plane count on mobile with capped DPR.
- Motion comfort: `medium`: forward depth motion; freeze z travel when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Planes use color variation to avoid a flat monochrome look.
- Motion decision: One receding z motion with per-plane speed variation.
- Interaction decision: No scroll or cursor; the fading planes should stand as a composition.
- Simplification pass: Used instancing and one material.

## Rubric

- Clarity: `2`
- Novelty: `2`
- Performance: `4`
- Implementation: `3`
- Taste: `2`
- Total: `13`

## Verdict

Failed/archive. Not strong enough to stay in main after grading.

## Decision Log

- `2026-05-04`: Created as a translucent-plane variant after liquid graded as cool.
- `2026-05-04`: Archived after explicit project grading.