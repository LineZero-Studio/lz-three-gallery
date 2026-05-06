# Orbit Dots

## Contract

- Slug: `orbit-dots`
- Seed: `orbit-dots-001`
- Status: `prototype`
- Grade: `D`
- Placement: `archive`

## Idea

Seeded points orbit the center like a small mechanical depth diagram.

## Novelty

- Claim: The novelty is the orrery-like depth ordering from a tiny seeded point system.
- Axis: `composition`

## Visual Direction

- Primary: `lo-fi-webgl`
- Qualifier: `mechanical point orrery`
- Reference: `mechanical orrery diagram made of light dots`
- Anti-reference: `random particle swarm`

## Inputs

- Interaction: `time`
- Primitive: `points`
- Palette: `#17120d`, `#f5c85f`, `#fff2b8`
- Motion rule: Each point follows a seeded elliptical orbit with shallow z-depth.
- Dominant parameter: `orbitalRadius`

## Constraints

- Performance budget: 128 points, one geometry attribute update per frame, no postprocessing.
- Mobile policy: `required`: same point count on mobile with capped DPR.
- Motion comfort: `low`: slow circular motion; freeze orbits when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Dots are distributed into nested ellipses around a fixed center mark.
- Motion decision: Orbit speed is slow and seeded, with alternating directions for readability.
- Interaction decision: No interaction; the orbital rule should be visible immediately.
- Simplification pass: Used one points draw call instead of individual meshes.

## Rubric

- Clarity: `2`
- Novelty: `2`
- Performance: `5`
- Implementation: `3`
- Taste: `1`
- Total: `13`

## Verdict

Prototype/D. Weak after review; archived during consolidation because the current orbit result lacks taste.

## Decision Log

- `2026-05-04`: Created as batch 1 effect with deterministic orbital parameters.
- `2026-05-04`: Regraded as a decent-start prototype after visual review.
- `2026-05-04`: Promoted to solid after follow-up review identified it as cool.
- `2026-05-04`: Regraded as a decent start after explicit project grading.
- `2026-05-04`: Regraded as weak after latest project grading.
- `2026-05-05`: Moved to archive during quality consolidation.
