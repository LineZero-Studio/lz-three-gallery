# Vein Map

## Contract

- Slug: `vein-map`
- Seed: `vein-map-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

Seeded vein paths pull from a cursor-controlled source node inside a leaf-shaped field.

## Novelty

- Claim: The novelty is a leaf-vein diagram whose source node can be gently repositioned.
- Axis: `mixed`

## Visual Direction

- Primary: `scientific-diagram`
- Qualifier: `botanical venation map`
- Reference: `botanical venation measurement drawing`
- Anti-reference: `decorative lightning web`

## Inputs

- Interaction: `time+cursor`
- Primitive: `lines`
- Palette: `#071008`, `#92f3a4`, `#f4ffd6`
- Motion rule: Veins pulse subtly while their source node follows a small cursor range.
- Dominant parameter: `sourceNode`

## Constraints

- Performance budget: 193 line segments, one position update per frame, no postprocessing.
- Mobile policy: `required`: same structure; touch repositions the source node when available.
- Motion comfort: `low`: slight vein pulse; freeze pulse when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Endpoints are distributed inside a leaf-width function.
- Motion decision: Pulse is tiny so the venation remains readable.
- Interaction decision: Cursor moves only the source node, not every endpoint.
- Simplification pass: Avoided iterative auxin/venation simulation.

## Rubric

- Clarity: `3`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `3`
- Total: `18`

## Verdict

Prototype after user grading. The biological diagram read is promising but not solid yet.

## Decision Log

- `2026-05-05`: Created for batch 3 from venation/simple-rule research.
- `2026-05-05`: User grading set this to `prototype` / `C`.
