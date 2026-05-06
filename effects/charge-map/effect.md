# Charge Map

## Contract

- Slug: `charge-map`
- Seed: `charge-map-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

A cursor charge bends a heat-contour field against two fixed reference charges.

## Novelty

- Claim: The novelty is turning the winning magnetic pull into a heat-and-contour field map.
- Axis: `mixed`

## Visual Direction

- Primary: `scientific-diagram`
- Qualifier: `charged field heat map`
- Reference: `charged particle field diagram with heat contours`
- Anti-reference: `generic neon plasma shader`

## Inputs

- Interaction: `time+cursor`
- Primitive: `shader`
- Palette: `#040610`, `#33c7ff`, `#ff8a2e`, `#ebf5ff`
- Motion rule: Field contours drift slowly while the cursor charge changes the heat distribution.
- Dominant parameter: `chargeStrength`

## Constraints

- Performance budget: One fullscreen plane, no textures, no postprocessing.
- Mobile policy: `required`: same shader with capped DPR; cursor falls back to center.
- Motion comfort: `low`: slow contour drift; freeze drift when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Two fixed reference charges prevent the cursor from becoming a toy pointer glow.
- Motion decision: Contours drift but the charge layout stays legible.
- Interaction decision: Cursor controls only one charge, leaving the diagram structure intact.
- Simplification pass: Kept it as one shader and avoided particle trails.

## Rubric

- Clarity: `3`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `3`
- Total: `18`

## Verdict

Prototype after user grading. The map idea is clear, but it needs a stronger visual pass before joining the solid group.

## Decision Log

- `2026-05-05`: Created for batch 1, extending the magnetic-field winner into a heat-map language.
- `2026-05-05`: User grading set this to `prototype` / `C`.
