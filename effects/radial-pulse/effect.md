# Radial Pulse

## Contract

- Slug: `radial-pulse`
- Seed: `radial-pulse-001`
- Status: `failed`
- Grade: `F`
- Placement: `archive`

## Idea

Thin rings expand from the center and fade out on a black field.

## Novelty

- Claim: The novelty is the strict time-staggered ring lifecycle with no secondary ornament.
- Axis: `composition`

## Visual Direction

- Primary: `minimal-graphic`
- Qualifier: `poster pulse`
- Reference: `Swiss poster motion study`
- Anti-reference: `music visualizer tunnel`

## Inputs

- Interaction: `time`
- Primitive: `lines`
- Palette: `#050505`, `#f4f0e8`
- Motion rule: Every ring increases radius over time and fades as it expands.
- Dominant parameter: `ringLifetime`

## Constraints

- Performance budget: 11 ring meshes, basic materials, no postprocessing.
- Mobile policy: `required`: same ring count on mobile with capped DPR.
- Motion comfort: `low`: slow expansion with no flashing; freeze rings when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Center dot plus concentric rings is enough to read.
- Motion decision: Expansion and fade are the only motion properties.
- Interaction decision: No interaction; the poster-like pulse should be immediate.
- Simplification pass: Removed color cycling and camera motion.

## Rubric

- Clarity: `1`
- Novelty: `1`
- Performance: `2`
- Implementation: `2`
- Taste: `1`
- Total: `7`

## Verdict

Failed/archive. It is simple, but not in a productive way; the result reads as placeholder pulse graphics rather than a finished minimal-graphic effect.

## Decision Log

- `2026-05-04`: Created as batch 1 effect with a strict ring lifecycle.
- `2026-05-04`: Archived after visual review; too generic to keep in main.
