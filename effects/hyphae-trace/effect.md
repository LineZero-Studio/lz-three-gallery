# Hyphae Trace

## Contract

- Slug: `hyphae-trace`
- Seed: `hyphae-trace-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

A seeded hyphae-like line network draws itself from one root.

## Novelty

- Claim: The novelty is a seeded branching network revealed as a drawing instead of simulated biology.
- Axis: `composition`

## Visual Direction

- Primary: `scientific-diagram`
- Qualifier: `biological growth trace`
- Reference: `hyphae growth diagram in ink`
- Anti-reference: `random lightning branches`

## Inputs

- Interaction: `time`
- Primitive: `lines`
- Palette: `#070604`, `#f0d58a`
- Motion rule: Segments reveal from root to tips once, then hold as a completed drawing.
- Dominant parameter: `branchProbability`

## Constraints

- Performance budget: Up to 190 line segments, one attribute update per frame, no postprocessing.
- Mobile policy: `required`: same segment count on mobile with capped DPR.
- Motion comfort: `low`: one reveal pass; show completed network when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: One root and a soft upward bias keep it biological rather than lightning-like.
- Motion decision: Reveal is one-way and then stops visually.
- Interaction decision: Time-only; no cursor because growth is the rule.
- Simplification pass: No collision solver, mesh tubes, labels, or extra anchor graphics.

## Rubric

- Clarity: `4`
- Novelty: `4`
- Performance: `5`
- Implementation: `3`
- Taste: `2`
- Total: `18`

## Verdict

Prototype after user grading. Simpler line-only version is the keeper, but it remains below solid.

## Decision Log

- `2026-05-05`: Created for batch 3 from simple-rule biological generative references.
- `2026-05-05`: User grading set this to `prototype` / `C`, with the note that it is cool but needs another pass.
- `2026-05-05`: Second pass added nutrient-guided growth, ghost substrate, color hierarchy, and visible node points.
- `2026-05-05`: User regrade said the second pass was weaker; simplified back to one controlled line network.
- `2026-05-05`: User regrade confirmed the simplified version remains `prototype` / `C`.
