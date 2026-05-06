# Signal Cut

## Contract

- Slug: `signal-cut`
- Seed: `signal-cut-001`
- Status: `prototype`
- Grade: `D`
- Placement: `archive`

## Idea

A signal trace is interrupted by hard print blocks, ticks, and crop cuts in an editorial palette.

## Novelty

- Claim: The novelty is rebuilding measurement language with print cuts instead of terminal-green diagnostics.
- Axis: `mixed`

## Visual Direction

- Primary: `editorial-motion`
- Qualifier: `printed diagnostic cut`
- Reference: `printed signal chart cropped through editorial blocks`
- Anti-reference: `generic green terminal scanner`

## Inputs

- Interaction: `time`
- Primitive: `planes`
- Palette: `#efe6d0`, `#151515`, `#c7351a`, `#214c70`
- Motion rule: A single signal trace drifts behind fixed crop blocks and tick marks.
- Dominant parameter: `cutMask`

## Constraints

- Performance budget: `under 80 flat planes, no custom shaders, no postprocessing`
- Mobile policy: `required: same chart with fixed geometry`
- Motion comfort: `low risk: freeze drift when reduced motion is requested`
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: The print blocks and chart ticks should read as editorial diagnostics before motion.
- Motion decision: Only the line trace drifts; the cuts are fixed.
- Interaction decision: Time-only because this is a changed measurement-language test, not a cursor instrument.
- Simplification pass: Avoided custom shaders after `range-gate` failures.

## Pattern Hypothesis

- Pattern: Measurement overlays improve when fused with editorial cuts and non-terminal color.
- Anti-pattern: Terminal-green scanner styling makes diagnostics generic.

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

- `2026-05-05`: Created for batch 2 from the changed measurement-overlay pattern.
- `2026-05-05`: User corrected grade to `D` / weak; moved to archive.
