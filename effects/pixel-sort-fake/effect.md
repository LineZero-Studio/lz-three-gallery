# Pixel Sort Fake

## Contract

- Slug: `pixel-sort-fake`
- Seed: `pixel-sort-fake-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

Seeded horizontal print bands jitter like a fake pixel-sort without source imagery.

## Novelty

- Claim: The novelty is borrowing falling-bars print rhythm for fake sorted bands without images.
- Axis: `composition`

## Visual Direction

- Primary: `optical-print`
- Qualifier: `screenprint glitch bands`
- Reference: `screenprint glitch bands`
- Anti-reference: `photo pixel-sort filter`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#0f0b08`, `#ff942b`, `#f01f52`, `#fae19e`
- Motion rule: Each horizontal band holds a seeded offset with a tiny time jitter.
- Dominant parameter: `bandOffset`

## Constraints

- Performance budget: one full-screen shader plane, no textures, no postprocessing.
- Mobile policy: `required`: same shader on mobile with capped DPR.
- Motion comfort: `low`: tiny horizontal jitter; freeze band phase when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: The image is generated from rows and block masks, not source media.
- Motion decision: Motion is minor so the print composition stays readable.
- Interaction decision: No interaction; it should read as a moving poster texture.
- Simplification pass: Kept to row hash, block mask, and three inks.

## Rubric

- Clarity: `4`
- Novelty: `3`
- Performance: `5`
- Implementation: `3`
- Taste: `2`
- Total: `17`

## Verdict

Prototype. A decent start in the optical-print direction, but not cool yet.

## Decision Log

- `2026-05-04`: Created after falling-bars graded cool.
- `2026-05-04`: Regraded as a decent start after explicit project grading.
