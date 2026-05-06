# Hinge Field

## Contract

- Slug: `hinge-field`
- Seed: `hinge-field-001`
- Status: `prototype`
- Grade: `D`
- Placement: `archive`

## Idea

Short hinged bars pivot around fixed anchors as the cursor applies local pressure.

## Novelty

- Claim: The novelty is replacing loose particle attraction with fixed hinges that rotate under cursor pressure.
- Axis: `interaction`

## Visual Direction

- Primary: `scientific-diagram`
- Qualifier: `mechanical linkage field`
- Reference: `mechanical linkage stress diagram`
- Anti-reference: `cursor particle swarm`

## Inputs

- Interaction: `time+cursor`
- Primitive: `lines`
- Palette: `#0c0b09`, `#221d17`, `#f3efe2`
- Motion rule: Each short bar pivots around a fixed anchor toward the cursor with subtle breathing.
- Dominant parameter: `hingeInfluence`

## Constraints

- Performance budget: `72 hinge segments, one buffer update per frame, no postprocessing`
- Mobile policy: `required: same hinges; cursor falls back to center`
- Motion comfort: `low risk: freeze breathing when reduced motion is requested`
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Anchors are implied by fixed segment bases in a regular field.
- Motion decision: Rotation replaces particle translation so relationships remain visible.
- Interaction decision: Cursor is primary because the field is a pressure test.
- Simplification pass: No dots, trails, labels, or secondary meshes.

## Pattern Hypothesis

- Pattern: Fixed topology with visible relationships can generalize from tension lines to hinges.
- Anti-pattern: Cursor particle swarms hide weak composition behind motion.

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

- `2026-05-05`: Created for batch 2 from the A-grade fixed-topology pattern.
- `2026-05-05`: User corrected grade to `D` / weak; moved to archive.
