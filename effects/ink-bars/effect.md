# Ink Bars

## Contract

- Slug: `ink-bars`
- Seed: `ink-bars-001`
- Status: `solid`
- Grade: `B`
- Placement: `main`

## Idea

Seeded red ink bars fall through a cream overprint poster system.

## Novelty

- Claim: The novelty is a more poster-like falling-bars variant with overprint rhythm.
- Axis: `composition`

## Visual Direction

- Primary: `optical-print`
- Qualifier: `screenprinted moving bar poster`
- Reference: `screenprinted moving bar poster`
- Anti-reference: `Matrix code rain`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#edd6a8`, `#d11209`, `#0a0e11`
- Motion rule: Seeded column bars fall vertically with overprint masks.
- Dominant parameter: `columnPhase`

## Constraints

- Performance budget: one full-screen shader plane, no textures, no postprocessing.
- Mobile policy: `required`: same shader on mobile with capped DPR.
- Motion comfort: `low`: slow vertical bar drift; freeze phase when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Cream/red/blue-black palette keeps it in print language.
- Motion decision: Only vertical bar phase moves.
- Interaction decision: No interaction; it should work as a moving poster.
- Simplification pass: No image sampling and no glitch effects.

## Rubric

- Clarity: `4`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `4`
- Total: `20`

## Verdict

Solid. Cool after grading; directly builds from the falling-bars winner with stronger print language.

## Decision Log

- `2026-05-05`: Created after falling-bars graded cool.
- `2026-05-05`: Confirmed cool after explicit grading.
