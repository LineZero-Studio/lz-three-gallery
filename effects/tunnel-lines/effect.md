# Tunnel Lines

## Contract

- Slug: `tunnel-lines`
- Seed: `tunnel-lines-001`
- Status: `failed`
- Grade: `F`
- Placement: `archive`

## Idea

Rectangular line frames advance through a simple vector tunnel.

## Novelty

- Claim: The novelty is the disciplined rectangular depth cadence rather than a generic particle tunnel.
- Axis: `composition`

## Visual Direction

- Primary: `arcade-vector`
- Qualifier: `rectangular depth cadence`
- Reference: `early vector arcade tunnel`
- Anti-reference: `neon music visualizer vortex`

## Inputs

- Interaction: `time`
- Primitive: `lines`
- Palette: `#05040c`, `#77f7ff`
- Motion rule: Each rectangle moves toward the camera and wraps back to the far end.
- Dominant parameter: `ringDepthSpacing`

## Constraints

- Performance budget: 24 rings, 96 line segments, one material, no postprocessing.
- Mobile policy: `required`: same line count on mobile with capped DPR.
- Motion comfort: `medium`: forward depth motion; freeze ring travel when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Rectangles are skewed only slightly so the tunnel remains readable.
- Motion decision: Motion is one-axis depth travel with no camera movement.
- Interaction decision: No cursor or scroll interaction; the tunnel must read on its own.
- Simplification pass: Removed connector rails and kept only repeated frames.

## Rubric

- Clarity: `1`
- Novelty: `1`
- Performance: `2`
- Implementation: `2`
- Taste: `1`
- Total: `7`

## Verdict

Failed/archive. The vector tunnel is cheap and technically readable, but visually it is a weak stock tunnel and does not earn a main-gallery slot.

## Decision Log

- `2026-05-04`: Created as batch 1 effect with seeded ring offsets.
- `2026-05-04`: Archived after visual review; it reads as generic filler.
