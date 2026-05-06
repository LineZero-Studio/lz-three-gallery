# Ripple Field

## Contract

- Slug: `ripple-field`
- Seed: `ripple-field-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

A measured field of points is displaced by circular ripples from the center.

## Novelty

- Claim: The novelty is the measured point-grid displacement rather than a water simulation.
- Axis: `composition`

## Visual Direction

- Primary: `scientific-diagram`
- Qualifier: `ripple tank plot`
- Reference: `lab ripple tank measurement plot`
- Anti-reference: `screensaver water shader`

## Inputs

- Interaction: `time`
- Primitive: `points`
- Palette: `#071014`, `#83d5ff`, `#e6fbff`
- Motion rule: Points shift radially as a damped circular wave passes through the grid.
- Dominant parameter: `wavePhase`

## Constraints

- Performance budget: 759 points, one position attribute update per frame, no postprocessing.
- Mobile policy: `required`: same count on mobile with capped DPR.
- Motion comfort: `low`: small radial displacement; freeze wave phase when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: The ordered point grid carries the scientific-diagram read.
- Motion decision: Only the radial wave phase changes.
- Interaction decision: No cursor source; the center origin is fixed for clarity.
- Simplification pass: Removed connecting lines so the field stays light.

## Rubric

- Clarity: `4`
- Novelty: `3`
- Performance: `5`
- Implementation: `3`
- Taste: `2`
- Total: `17`

## Verdict

Prototype. The ripple field remains a decent start because the field rule reads, but it is no longer graded as a top keeper after review.

## Decision Log

- `2026-05-04`: Created as batch 1 effect with deterministic grid jitter.
- `2026-05-04`: Promoted after visual review as the only clearly cool first-batch effect.
- `2026-05-04`: Regraded as a decent start after follow-up review.
