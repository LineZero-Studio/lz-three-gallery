# Liquid Mask

## Contract

- Slug: `liquid-mask`
- Seed: `liquid-mask-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

Liquid contour lines flow only inside a hard-edged graphic mask.

## Novelty

- Claim: The novelty is forcing a liquid contour shader through a hard editorial mask.
- Axis: `composition`

## Visual Direction

- Primary: `material-abstraction`
- Qualifier: `masked liquid poster`
- Reference: `liquid topography inside a Swiss poster mask`
- Anti-reference: `full-screen wavy texture`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#030303`, `#e3dbca`, `#2e8cb8`
- Motion rule: Contours drift slowly while the mask remains locked to the frame.
- Dominant parameter: `maskEdge`

## Constraints

- Performance budget: One fullscreen plane, analytic mask and waves, no textures.
- Mobile policy: `required`: same mask and contour density on mobile.
- Motion comfort: `low`: slow liquid drift; freeze flow when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: A slab, cutout, and circle form the hard graphic mask.
- Motion decision: Liquid moves underneath; mask does not move.
- Interaction decision: Time-only preserves the editorial poster read.
- Simplification pass: Avoided full topographic line geometry after topo-slices graded weak.

## Rubric

- Clarity: `3`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `3`
- Total: `18`

## Verdict

Prototype after user grading. The liquid-mask idea needs another visual pass before it can sit with the keepers.

## Decision Log

- `2026-05-05`: Created for batch 1 after topo-slices failed to make the liquid/topography idea sharp.
- `2026-05-05`: User grading set this to `prototype` / `C`.
