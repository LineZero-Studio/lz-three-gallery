# Topo Slices

## Contract

- Slug: `topo-slices`
- Seed: `topo-slices-001`
- Status: `prototype`
- Grade: `D`
- Placement: `archive`

## Idea

Stacked contour slices ripple like a flat liquid section drawing.

## Novelty

- Claim: The novelty is reducing liquid topography to animated stacked line slices.
- Axis: `composition`

## Visual Direction

- Primary: `material-abstraction`
- Qualifier: `flat liquid contour section`
- Reference: `flat liquid contour section drawing`
- Anti-reference: `3D terrain wireframe`

## Inputs

- Interaction: `time`
- Primitive: `lines`
- Palette: `#050404`, `#e7dcc6`
- Motion rule: Horizontal contour slices ripple with seeded row phases.
- Dominant parameter: `rowPhase`

## Constraints

- Performance budget: 616 line segments, one position update per frame, no postprocessing.
- Mobile policy: `required`: same line count on mobile with capped DPR.
- Motion comfort: `low`: slow horizontal line ripple; freeze phase when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Flat rows avoid becoming the archived terrain direction.
- Motion decision: One line-ripple rule; no camera or depth travel.
- Interaction decision: No interaction; the sliced material read should stand alone.
- Simplification pass: Single line material and two-color palette.

## Rubric

- Clarity: `2`
- Novelty: `2`
- Performance: `4`
- Implementation: `3`
- Taste: `1`
- Total: `12`

## Verdict

Prototype/D. Weak after grading; archived during consolidation so it does not dilute main.

## Decision Log

- `2026-05-05`: Created after liquid graded as best.
- `2026-05-05`: Regraded as weak after explicit grading.
- `2026-05-05`: Moved to archive during quality consolidation.
