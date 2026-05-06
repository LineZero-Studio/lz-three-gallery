# Scroll Stripes

## Contract

- Slug: `scroll-stripes`
- Seed: `scroll-stripes-001`
- Status: `failed`
- Grade: `F`
- Placement: `archive`

## Idea

Clean striped pattern drifts with subtle wave distortion like animated screenprint.

## Novelty

- Claim: The novelty is a clean stripe pattern with wave distortion instead of sorted/glitch bands.
- Axis: `technique`

## Visual Direction

- Primary: `optical-print`
- Qualifier: `animated screenprint stripes`
- Reference: `animated screenprint stripes`
- Anti-reference: `pixel sort glitch`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#f6f4ef`, `#1e1a24`, `#faf8f5`
- Motion rule: Stripe pattern drifts with wave distortion and subtle base-phase movement.
- Dominant parameter: `waveAmplitude`

## Constraints

- Performance budget: one full-screen shader plane, no postprocessing, capped DPR.
- Mobile policy: `required`: same shader on mobile with capped DPR.
- Motion comfort: `low`: slow stripe drift; freeze motion when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Keep stripes clean and high-contrast for immediate readability.
- Motion decision: Wave distortion plus slow drift; no hard cuts or glitching.
- Interaction decision: No scroll interaction in the gallery version; it stands as a moving print.
- Simplification pass: No image input, no sorting logic, just procedural stripes.

## Rubric

- Clarity: `3`
- Novelty: `2`
- Performance: `5`
- Implementation: `4`
- Taste: `2`
- Total: `16`

## Verdict

Failed/archive. Weak after grading, not worth keeping in main.

## Decision Log

- `2026-05-04`: Created as a cleaner optical-print variant after pixel-sort-fake graded as decent start.
- `2026-05-04`: Archived after explicit project grading.