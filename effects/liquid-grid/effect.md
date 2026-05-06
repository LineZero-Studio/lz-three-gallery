# Liquid Grid

## Contract

- Slug: `liquid-grid`
- Seed: `liquid-grid-001`
- Status: `solid`
- Grade: `B`
- Placement: `main`

## Idea

A structured grid warps like a material surface under tension.

## Novelty

- Claim: The novelty is a structured grid with liquid warp instead of organic terrain.
- Axis: `technique`

## Visual Direction

- Primary: `material-abstraction`
- Qualifier: `warped grid material study`
- Reference: `warped grid material study`
- Anti-reference: `organic liquid terrain`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#050706`, `#268f73`, `#47c79f`
- Motion rule: The grid lines warp with a smooth liquid motion while the surface shows subtle phase movement.
- Dominant parameter: `warpAmplitude`

## Constraints

- Performance budget: one full-screen shader plane, no postprocessing, capped DPR.
- Mobile policy: `required`: same shader on mobile with capped DPR.
- Motion comfort: `low`: slow warp animation; freeze when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Two grid layers (coarse + fine) give the structure without being busy.
- Motion decision: Warp uses sine-based liquid motion; surface phase adds subtle movement.
- Interaction decision: No interaction; the material should read as a static composition first.
- Simplification pass: No lighting, no textures, just procedural grid and warp.

## Rubric

- Clarity: `4`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `4`
- Total: `20`

## Verdict

Solid. Promoted to cool after grading; stays in the material family but different enough from liquid.

## Decision Log

- `2026-05-04`: Created as a grid-structured variant after liquid graded as cool.
- `2026-05-04`: Promoted to cool after explicit project grading.