# Bulge Study

## Contract

- Slug: `bulge`
- Seed: `bulge-study-001`
- Status: `failed`
- Grade: `F`
- Placement: `archive`

## Idea

A generated calibration grid ripples from the center as a rough bulge prototype.

## Novelty

- Claim: The novelty is the direct generated grid deformation without image or video texture support.
- Axis: `technique`

## Visual Direction

- Primary: `shader-study`
- Qualifier: `printed calibration sheet`
- Reference: `printed calibration sheet bending under pressure`
- Anti-reference: `asset-backed scroll demo with hidden media`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#ece4d4`, `#16130f`
- Motion rule: A single radial sine bulge travels through the plane.
- Dominant parameter: `uAmplitude`

## Constraints

- Performance budget: one 48x48 plane, one short shader pair, no postprocessing.
- Mobile policy: `required`: same generated plane and shader on mobile.
- Motion comfort: `low`: small displacement only; freeze time when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Replaced the old image/video dependency with a generated grid.
- Motion decision: Kept one radial deformation and removed scroll-state animation logic.
- Interaction decision: Uses time only in the registry route.
- Simplification pass: Reduced to two colors and one plane.

## Rubric

- Clarity: `1`
- Novelty: `1`
- Performance: `2`
- Implementation: `2`
- Taste: `1`
- Total: `7`

## Verdict

Failed/archive. The bulge is readable in the most basic sense, but the generated-grid replacement is not visually good enough to keep in main.

## Decision Log

- `2026-05-04`: Registered as a rough main prototype with generated visuals only.
- `2026-05-04`: Archived after visual review; fixing the asset problem did not save the effect.
