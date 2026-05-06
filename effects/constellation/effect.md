# Constellation

## Contract

- Slug: `constellation`
- Seed: `constellation-001`
- Status: `prototype`
- Grade: `D`
- Placement: `archive`

## Idea

Seeded points form a sparse star chart with short measured links.

## Novelty

- Claim: The novelty is the deterministic nearest-link chart with tiny orbital drift.
- Axis: `composition`

## Visual Direction

- Primary: `scientific-diagram`
- Qualifier: `astronomical measurement chart`
- Reference: `astronomical measurement chart`
- Anti-reference: `generic connected particle network`

## Inputs

- Interaction: `time`
- Primitive: `mixed`
- Palette: `#070711`, `#4e6fff`, `#ffe6a3`
- Motion rule: Points drift in tiny seeded loops while their short links follow.
- Dominant parameter: `linkDistanceThreshold`

## Constraints

- Performance budget: 64 points, up to 96 line segments, two geometry updates per frame, no postprocessing.
- Mobile policy: `required`: same counts on mobile with capped DPR.
- Motion comfort: `low`: tiny local drift; freeze drift when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Links are distance-thresholded and capped so it stays like a chart, not a web.
- Motion decision: Tiny local drift only; no camera motion or swarm behavior.
- Interaction decision: No cursor attraction because that would destroy the chart.
- Simplification pass: Reduced to two draw calls and capped links at 96.

## Rubric

- Clarity: `2`
- Novelty: `2`
- Performance: `5`
- Implementation: `3`
- Taste: `1`
- Total: `13`

## Verdict

Prototype/D. Weak after review; archived during consolidation because the chart structure is not distinct enough.

## Decision Log

- `2026-05-04`: Created as batch 2 effect after orbit/ripple tested well.
- `2026-05-04`: Regraded as a decent start after explicit project grading.
- `2026-05-04`: Regraded as weak after latest project grading.
- `2026-05-05`: Moved to archive during quality consolidation.
