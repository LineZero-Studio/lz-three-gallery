# Grid Magnet

## Contract

- Slug: `grid-magnet`
- Seed: `grid-magnet-001`
- Status: `solid`
- Grade: `B`
- Placement: `main`

## Idea

A structured grid bends toward a magnetic cursor target.

## Novelty

- Claim: The novelty is combining liquid-grid structure with magnetic cursor bending.
- Axis: `mixed`

## Visual Direction

- Primary: `material-abstraction`
- Qualifier: `cursor-bent instrument grid`
- Reference: `cursor-bent instrument grid`
- Anti-reference: `generic mouse distortion shader`

## Inputs

- Interaction: `time+cursor`
- Primitive: `shader`
- Palette: `#040606`, `#38e0b8`, `#f2ffdb`
- Motion rule: Grid cells bend locally toward a cursor target while fine lines drift slowly.
- Dominant parameter: `cursorBendStrength`

## Constraints

- Performance budget: one full-screen shader plane, no textures, no postprocessing.
- Mobile policy: `reduced`: grid stays readable without precise cursor input.
- Motion comfort: `low`: local cursor bend; freeze drift when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Coarse and fine grids keep the structured material language.
- Motion decision: Cursor bend is primary; fine-line drift is secondary and slow.
- Interaction decision: Cursor maps to one visible magnetic target ring in the shader.
- Simplification pass: No postprocessing, no texture displacement, no mesh subdivision.

## Rubric

- Clarity: `4`
- Novelty: `4`
- Performance: `5`
- Implementation: `4`
- Taste: `4`
- Total: `21`

## Verdict

Solid. Cool after grading; combines liquid-grid and magnetic-field signals without adding assets.

## Decision Log

- `2026-05-05`: Created after liquid-grid graded cool and magnetic-field graded best.
- `2026-05-05`: Confirmed cool after explicit grading.
