# Sand Spline

## Contract

- Slug: `sand-spline`
- Seed: `sand-spline-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

Tiny seeded grains sit on animated spline rows like a sand-plotter drawing.

## Novelty

- Claim: The novelty is making grains read as drawn splines rather than a particle cloud.
- Axis: `composition`

## Visual Direction

- Primary: `material-abstraction`
- Qualifier: `sand plotter lines`
- Reference: `sand plotter spline drawing`
- Anti-reference: `generic particle rain`

## Inputs

- Interaction: `time`
- Primitive: `points`
- Palette: `#0b0906`, `#e8c77d`
- Motion rule: Grains hold row membership while their spline rows drift slowly.
- Dominant parameter: `splineAmplitude`

## Constraints

- Performance budget: 640 points, one attribute update per frame, no postprocessing.
- Mobile policy: `required`: same point count on mobile with capped DPR.
- Motion comfort: `low`: slow spline drift; freeze drift when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Fixed rows make the grains read as plotted lines.
- Motion decision: Spline drift is small and coherent, not random per-particle motion.
- Interaction decision: Time-only; no cursor so the sand drawing remains calm.
- Simplification pass: Avoided particle physics and trails.

## Rubric

- Clarity: `3`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `3`
- Total: `18`

## Verdict

Prototype after user grading. The spline/grain structure is promising but not solid yet.

## Decision Log

- `2026-05-05`: Created for batch 3 from sand-spline/generative drawing research.
- `2026-05-05`: User grading set this to `prototype` / `C`.
