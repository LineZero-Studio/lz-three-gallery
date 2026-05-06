# Depth Cards

## Contract

- Slug: `depth-cards`
- Seed: `depth-cards-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

Flat crop cards drift through shallow depth like an editorial layout system.

## Novelty

- Claim: The novelty is turning editorial crop cards into a minimal z-space rhythm.
- Axis: `composition`

## Visual Direction

- Primary: `editorial-motion`
- Qualifier: `floating crop cards`
- Reference: `floating magazine crop marks`
- Anti-reference: `generic 3D card carousel`

## Inputs

- Interaction: `time`
- Primitive: `planes`
- Palette: `#10100d`, `#f2d27d`
- Motion rule: Seeded flat cards drift forward through shallow depth and wrap.
- Dominant parameter: `cardDepthSpeed`

## Constraints

- Performance budget: 28 instanced planes, one matrix update per card, no textures, no postprocessing.
- Mobile policy: `required`: same card count on mobile with capped DPR.
- Motion comfort: `medium`: depth drift; freeze z travel when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Rectangles vary in width and height but share one material.
- Motion decision: Single z-wrap motion; no camera movement.
- Interaction decision: No scroll yet because the base depth rhythm needs grading first.
- Simplification pass: Used instancing and one color to avoid a carousel feel.

## Rubric

- Clarity: `3`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `3`
- Total: `18`

## Verdict

Prototype. Clear enough as a depth/layout study, but it may need typography or stronger editorial rules later.

## Decision Log

- `2026-05-04`: Created as an editorial-motion candidate after falling-bars graded cool.
