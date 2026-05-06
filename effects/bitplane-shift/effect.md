# Bitplane Shift

## Contract

- Slug: `bitplane-shift`
- Seed: `bitplane-shift-001`
- Status: `prototype`
- Grade: `D`
- Placement: `archive`

## Idea

Offset red, green, and blue bitplanes pulse as a compact diagnostic display.

## Novelty

- Claim: The novelty is stacking deterministic binary planes with small registration offsets.
- Axis: `composition`

## Visual Direction

- Primary: `terminal-diagnostic`
- Qualifier: `RGB bitplane display`
- Reference: `RGB bitplane diagnostic display`
- Anti-reference: `fullscreen glitch wallpaper`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#010104`, `#e64a58`, `#59db82`, `#668cff`
- Motion rule: Bitplanes pulse through deterministic row thresholds.
- Dominant parameter: `planeOffset`

## Constraints

- Performance budget: One fullscreen plane, three cell passes, no textures.
- Mobile policy: `required`: same grid density on mobile.
- Motion comfort: `medium-low`: slow threshold pulses; freeze when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: A framed grid makes the offset planes feel like a diagnostic tile.
- Motion decision: Pulse thresholds move slowly enough to stay readable.
- Interaction decision: Time-only keeps it machine-like.
- Simplification pass: No scanline distortion; the offsets are the effect.

## Rubric

- Clarity: `2`
- Novelty: `2`
- Performance: `5`
- Implementation: `3`
- Taste: `1`
- Total: `13`

## Verdict

Weak after user grading. Archived until the bitplane idea gets a stronger visual rule.

## Decision Log

- `2026-05-05`: Created for batch 2 from deterministic bitplane/display research.
- `2026-05-05`: User grading set this to `prototype` / `D` and moved it to archive.
