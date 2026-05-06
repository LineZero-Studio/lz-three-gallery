# Cell Membrane

## Contract

- Slug: `cell-membrane`
- Seed: `cell-membrane-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

A field of crisp membrane cells wobbles like a restrained microscopy diagram.

## Novelty

- Claim: The novelty is a crisp Voronoi membrane material with minimal organic wobble.
- Axis: `technique`

## Visual Direction

- Primary: `material-abstraction`
- Qualifier: `microscopy membrane field`
- Reference: `microscopy cell membrane diagram`
- Anti-reference: `lava lamp blobs`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#050302`, `#eb9e42`, `#42d1b8`, `#ffe08f`
- Motion rule: Cell centers wobble slightly while membrane borders stay crisp.
- Dominant parameter: `membraneSharpness`

## Constraints

- Performance budget: One fullscreen plane, nine-neighbor analytic Voronoi, no textures.
- Mobile policy: `required`: same cell density on mobile with capped DPR.
- Motion comfort: `low`: subtle membrane wobble; freeze wobble when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Low cell count keeps the material readable.
- Motion decision: Wobble is small to avoid lava-lamp behavior.
- Interaction decision: Time-only because the material itself is the study.
- Simplification pass: No reaction-diffusion simulation or feedback buffer.

## Rubric

- Clarity: `3`
- Novelty: `3`
- Performance: `4`
- Implementation: `4`
- Taste: `3`
- Total: `17`

## Verdict

Prototype after user grading. Organic and readable, but needs a stronger second pass.

## Decision Log

- `2026-05-05`: Created for batch 3 as an organic material study with a hard readability constraint.
- `2026-05-05`: User grading set this to `prototype` / `C`.
