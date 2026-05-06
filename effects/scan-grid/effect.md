# Scan Grid

## Contract

- Slug: `scan-grid`
- Seed: `scan-grid-001`
- Status: `failed`
- Grade: `F`
- Placement: `archive`

## Idea

A monochrome grid is swept by a slow diagnostic scan band.

## Novelty

- Claim: The novelty is the single scanning band exposing a restrained diagnostic grid.
- Axis: `composition`

## Visual Direction

- Primary: `terminal-diagnostic`
- Qualifier: `green phosphor scan`
- Reference: `monochrome terminal scanner`
- Anti-reference: `busy cyberpunk HUD`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#020604`, `#0d3d21`, `#1f9448`, `#b2ff8f`
- Motion rule: A horizontal scan band travels upward through a fixed grid.
- Dominant parameter: `scanBandPosition`

## Constraints

- Performance budget: one full-screen plane, short fragment shader, no postprocessing.
- Mobile policy: `required`: same shader on mobile with capped DPR.
- Motion comfort: `low`: slow scan band; freeze band when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Two grid scales are enough to read as a diagnostic screen.
- Motion decision: The scan band is the only moving element.
- Interaction decision: No cursor or scroll input to avoid HUD clutter.
- Simplification pass: Removed labels and fake interface widgets.

## Rubric

- Clarity: `1`
- Novelty: `1`
- Performance: `2`
- Implementation: `2`
- Taste: `1`
- Total: `7`

## Verdict

Failed/archive. The scan reads as expected filler and should leave the main gallery.

## Decision Log

- `2026-05-04`: Created as batch 1 effect with one scan-band shader.
- `2026-05-04`: Regraded as a decent-start prototype after visual review.
- `2026-05-04`: Archived after explicit project grading.
