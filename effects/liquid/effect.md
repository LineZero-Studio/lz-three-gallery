# Liquid Topography

## Contract

- Slug: `liquid`
- Seed: `liquid-topography-001`
- Status: `showcase`
- Grade: `A`
- Placement: `main`

## Idea

The design-testing liquid topography defaults rendered as the strongest root registry effect.

## Novelty

- Claim: The novelty is the inherited design-testing liquid surface defaults preserved without debug UI.
- Axis: `technique`

## Visual Direction

- Primary: `material-abstraction`
- Qualifier: `topographic liquid lines`
- Reference: `slow liquid contour map`
- Anti-reference: `muddy procedural surface demo`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#000000`, `#E6E2DD`
- Motion rule: The default surface height field evolves slowly while the camera stays at the design-testing starting position.
- Dominant parameter: `warpStrength`

## Constraints

- Performance budget: one 50x50 plane, one shader material, no postprocessing, capped DPR.
- Mobile policy: `required`: same shader plane with capped DPR.
- Motion comfort: `low`: slow contour drift; freeze time when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Reset to the `../design-testing` defaults: `surfaces`, `lineDensity=50`, `scale=0.5`, `color=#E6E2DD`.
- Motion decision: Time uses the same default `animationSpeed=0.15`; scroll progress is held at the initial design-testing value.
- Interaction decision: The root registry version removes scroll and debug controls but keeps the default starting camera.
- Simplification pass: Reverted the altered line-only variant because it was not the requested liquid topography effect.

## Rubric

- Clarity: `5`
- Novelty: `4`
- Performance: `4`
- Implementation: `5`
- Taste: `5`
- Total: `23`

## Verdict

Showcase. Still the top reference alongside magnetic-field after grading.

## Decision Log

- `2026-05-04`: Registered as a solid main effect with no default debug UI.
- `2026-05-04`: Reset to the `../design-testing` defaults after visual review.
- `2026-05-04`: Promoted after follow-up review identified it as the best effect so far.
- `2026-05-04`: Regraded as cool/solid after latest project grading.
