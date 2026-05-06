# Slice Lock

## Contract

- Slug: `slice-lock`
- Seed: `slice-lock-001`
- Status: `prototype`
- Grade: `D`
- Placement: `archive`

## Idea

Moving color bands slide behind three fixed column masks and never escape the poster grid.

## Novelty

- Claim: The novelty is testing whether hard poster columns can make simple moving bands feel locked and editorial.
- Axis: `composition`

## Visual Direction

- Primary: `editorial-motion`
- Qualifier: `locked poster strips`
- Reference: `offset print strips trapped in poster columns`
- Anti-reference: `full-screen procedural stripe wallpaper`

## Inputs

- Interaction: `time`
- Primitive: `planes`
- Palette: `#e8ddc8`, `#111111`, `#d73a18`, `#173b61`
- Motion rule: Bands drift laterally behind fixed columns while the crop edges remain static.
- Dominant parameter: `columnMask`

## Constraints

- Performance budget: `under 70 flat planes, no custom shaders, no postprocessing`
- Mobile policy: `required: same column layout with reduced spacing if needed`
- Motion comfort: `low risk: freeze bands when reduced motion is requested`
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: The column grid is readable before motion.
- Motion decision: Only the internal band groups move.
- Interaction decision: Time-only because cursor would weaken the locked-poster behavior.
- Simplification pass: Avoided shader masking and used cover planes to keep the implementation inspectable.

## Pattern Hypothesis

- Pattern: Hard editorial masks over simple motion generalize beyond `crop-current`.
- Anti-pattern: Full-screen stripe motion reads as wallpaper without crop constraints.

## Rubric

- Clarity: `2`
- Novelty: `2`
- Performance: `5`
- Implementation: `4`
- Taste: `1`
- Total: `14`

## Verdict

Prototype/D. Weak after user grading; archived so it does not appear in Keepers.

## Decision Log

- `2026-05-05`: Created for batch 2 from the A-grade hard-mask pattern.
- `2026-05-05`: User corrected grade to `D` / weak; moved to archive.
