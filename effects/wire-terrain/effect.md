# Wire Terrain

## Contract

- Slug: `wire-terrain`
- Seed: `wire-terrain-001`
- Status: `failed`
- Grade: `F`
- Placement: `archive`

## Idea

A sparse wire terrain scrolls forward like a topographic vector plot.

## Novelty

- Claim: The novelty is the topographic read built from a very small moving wire grid.
- Axis: `composition`

## Visual Direction

- Primary: `arcade-vector`
- Qualifier: `topographic vector horizon`
- Reference: `vector terrain horizon plot`
- Anti-reference: `generic infinite grid floor`

## Inputs

- Interaction: `time`
- Primitive: `lines`
- Palette: `#020707`, `#7dffb0`
- Motion rule: The grid advances slowly while row heights undulate from deterministic waves.
- Dominant parameter: `terrainScrollSpeed`

## Constraints

- Performance budget: 272 line segments, one geometry update per frame, one material, no postprocessing.
- Mobile policy: `required`: same wire count on mobile with capped DPR.
- Motion comfort: `medium`: forward field movement; freeze scroll when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Horizontal contour rows dominate; only four cross columns are included to avoid generic grid clutter.
- Motion decision: Motion is a slow forward offset and deterministic height phase.
- Interaction decision: No cursor or scroll input; the topographic read should be immediate.
- Simplification pass: Kept under 300 segments and avoided camera movement.

## Rubric

- Clarity: `1`
- Novelty: `1`
- Performance: `2`
- Implementation: `2`
- Taste: `1`
- Total: `7`

## Verdict

Failed/archive. The topographic intent did not land and the effect should not stay in the main gallery.

## Decision Log

- `2026-05-04`: Created as batch 2 effect after liquid/ripple/orbit emerged as the strongest direction.
- `2026-05-04`: Archived after explicit project grading.
