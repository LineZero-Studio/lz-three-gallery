# Orbit Field

## Contract

- Slug: `orbit-field`
- Seed: `orbit-field-001`
- Status: `failed`
- Grade: `F`
- Placement: `archive`

## Idea

Nested point orbits follow a cursor target like a movable measurement instrument.

## Novelty

- Claim: The novelty is a cursor-positioned orbit diagram instead of free-floating orbit dots.
- Axis: `mixed`

## Visual Direction

- Primary: `scientific-diagram`
- Qualifier: `portable orrery target`
- Reference: `portable orrery measurement target`
- Anti-reference: `random orbital screensaver`

## Inputs

- Interaction: `time+cursor`
- Primitive: `points`
- Palette: `#09080b`, `#f2d7a0`, `#ffb84d`
- Motion rule: Points orbit nested guide rings that follow one cursor target.
- Dominant parameter: `orbitRadius`

## Constraints

- Performance budget: 160 points, five ring meshes, one attribute update per frame, no postprocessing.
- Mobile policy: `reduced`: centered orbit field remains readable without cursor precision.
- Motion comfort: `low`: slow orbital motion; freeze orbit phase when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Visible guide rings make the orbit structure explicit.
- Motion decision: Slow nested orbit only, no camera movement.
- Interaction decision: Cursor moves the whole instrument, not individual points.
- Simplification pass: No trails and no per-point materials.

## Rubric

- Clarity: `1`
- Novelty: `1`
- Performance: `2`
- Implementation: `2`
- Taste: `1`
- Total: `7`

## Verdict

Failed/archive. The orbit rescue did not work and should leave the main gallery.

## Decision Log

- `2026-05-05`: Created from the weak orbit-dots direction with a stronger diagram rule.
- `2026-05-05`: Archived after explicit grading.
