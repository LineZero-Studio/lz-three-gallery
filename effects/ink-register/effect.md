# Ink Register

## Contract

- Slug: `ink-register`
- Seed: `ink-register-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

Misregistered cyan, red, and black ink bars crawl across a paper-like test sheet.

## Novelty

- Claim: The novelty is adding visible registration error to the falling-bars print language.
- Axis: `composition`

## Visual Direction

- Primary: `optical-print`
- Qualifier: `misregistered screenprint`
- Reference: `screenprint registration test sheet`
- Anti-reference: `random glitch stripes`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#ead0a0`, `#031f29`, `#d60d1a`, `#090807`
- Motion rule: Each ink channel crawls at a slightly different deterministic speed.
- Dominant parameter: `registrationOffset`

## Constraints

- Performance budget: One fullscreen plane, three analytic bar passes, no textures.
- Mobile policy: `required`: same composition on mobile with capped DPR.
- Motion comfort: `medium-low`: vertical crawl; freeze crawl when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: A left registration mark makes the sheet read as print process, not just bars.
- Motion decision: Channel speeds differ subtly to show misregistration over time.
- Interaction decision: Time-only keeps the poster object stable.
- Simplification pass: Avoided extra halftones so the bars remain the main shape.

## Rubric

- Clarity: `3`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `3`
- Total: `18`

## Verdict

Prototype after user grading. The print-registration direction is promising but not solid yet.

## Decision Log

- `2026-05-05`: Created for batch 1 from the optical-print winner cluster.
- `2026-05-05`: User grading set this to `prototype` / `C`.
