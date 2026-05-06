# Threshold Map

## Contract

- Slug: `threshold-map`
- Seed: `threshold-map-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

Deterministic cells cross a cursor-controlled threshold with a visible ruler marker.

## Novelty

- Claim: The novelty is exposing a deterministic threshold as the only interaction parameter.
- Axis: `interaction`

## Visual Direction

- Primary: `terminal-diagnostic`
- Qualifier: `classifier threshold display`
- Reference: `binary classifier confidence map`
- Anti-reference: `random blinking grid`

## Inputs

- Interaction: `time+cursor`
- Primitive: `shader`
- Palette: `#020404`, `#0b0e0f`, `#b8f5db`, `#ffaa3d`
- Motion rule: Cell values drift slowly while the cursor shifts the activation threshold.
- Dominant parameter: `threshold`

## Constraints

- Performance budget: One fullscreen plane, one cell lookup per pixel, no textures.
- Mobile policy: `required`: touch controls threshold when available.
- Motion comfort: `low`: slow value wave; freeze wave when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: A vertical ruler makes the threshold visible.
- Motion decision: Only the cell values drift; the grid itself is static.
- Interaction decision: Cursor x controls threshold, cursor y is ignored to keep one dominant parameter.
- Simplification pass: Avoided hover labels and numeric UI.

## Rubric

- Clarity: `3`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `3`
- Total: `18`

## Verdict

Prototype after user grading. The threshold rule is readable but needs more taste before promotion.

## Decision Log

- `2026-05-05`: Created for batch 2 from controlled-randomness research.
- `2026-05-05`: User grading set this to `prototype` / `C`.
