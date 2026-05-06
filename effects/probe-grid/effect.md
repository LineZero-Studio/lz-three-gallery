# Probe Grid

## Contract

- Slug: `probe-grid`
- Seed: `probe-grid-001`
- Status: `solid`
- Grade: `B`
- Placement: `main`

## Idea

A measurement grid bends around the cursor probe with crosshair ticks and a target ring.

## Novelty

- Claim: The novelty is a cursor-bent grid treated as an instrument probe rather than a decorative warp.
- Axis: `interaction`

## Visual Direction

- Primary: `scientific-diagram`
- Qualifier: `probe calibration grid`
- Reference: `oscilloscope calibration grid with probe crosshair`
- Anti-reference: `generic green cyber grid`

## Inputs

- Interaction: `time+cursor`
- Primitive: `shader`
- Palette: `#020808`, `#30d4a3`, `#e6ffe6`
- Motion rule: Fine ticks drift slowly while the cursor bends the grid locally.
- Dominant parameter: `probeBend`

## Constraints

- Performance budget: One fullscreen plane, analytic grid math, no geometry updates.
- Mobile policy: `required`: same composition; touch position maps to probe when available.
- Motion comfort: `low`: slow tick drift; freeze ticks when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Crosshair axes give the grid an instrument purpose.
- Motion decision: Motion is secondary to the probe bend.
- Interaction decision: Cursor position is visible through both bend and target ring.
- Simplification pass: Avoided labels and text to keep the grid clean.

## Rubric

- Clarity: `4`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `4`
- Total: `20`

## Verdict

Solid after user grading. Failed polish pass was reverted; simpler B version remains the keeper.

## Decision Log

- `2026-05-05`: Created for batch 1 as a tighter grid-magnet variant.
- `2026-05-05`: User grading kept this at `solid` / `B`.
- `2026-05-05`: Polish pass added nested reticle rings, axis ruler ticks, subtle scan band, and instrument frame.
- `2026-05-05`: User regrade marked the polish as `C`; reverted to the simpler `B` version.
