# Type Drift

## Contract

- Slug: `type-drift`
- Seed: `type-drift-001`
- Status: `prototype`
- Grade: `D`
- Placement: `archive`

## Idea

Seeded typographic fragments drift in a sparse dark field.

## Novelty

- Claim: The novelty is seeded typographic fragments drifting in a sparse field without narrative.
- Axis: `composition`

## Visual Direction

- Primary: `kinetic-type`
- Qualifier: `floating typographic fragments`
- Reference: `floating typographic fragments`
- Anti-reference: `falling letters animation`

## Inputs

- Interaction: `time`
- Primitive: `text`
- Palette: `#0a0b0d`, `#c8ffea`
- Motion rule: Each typographic fragment drifts in a small seeded loop with oscillating opacity.
- Dominant parameter: `driftRadius`

## Constraints

- Performance budget: 12 mesh-based text fragments, per-frame matrix updates, no postprocessing.
- Mobile policy: `required`: same fragment count on mobile with capped DPR.
- Motion comfort: `low`: slow drift; freeze movement when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Fragments are sparse and use a limited vocabulary.
- Motion decision: Small independent loops only; no camera movement.
- Interaction decision: No interaction; the kinetic-type composition should read on its own.
- Simplification pass: Used plain meshes instead of drei Text to avoid font dependency.

## Rubric

- Clarity: `2`
- Novelty: `2`
- Performance: `5`
- Implementation: `3`
- Taste: `1`
- Total: `13`

## Verdict

Prototype/D. Weak after grading; archived during consolidation until rebuilt with stronger editorial direction.

## Decision Log

- `2026-05-04`: Created as a kinetic-type candidate after liquid/falling-bars graded cool.
- `2026-05-04`: Regraded as weak after explicit project grading.
- `2026-05-05`: Moved to archive during quality consolidation.
