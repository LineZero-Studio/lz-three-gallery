# Field Lines

## Contract

- Slug: `field-lines`
- Seed: `field-lines-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

Short seeded vector strokes bend around a cursor target with measurement rings.

## Novelty

- Claim: The novelty is translating the winning magnetic-field interaction into line strokes.
- Axis: `interaction`

## Visual Direction

- Primary: `scientific-diagram`
- Qualifier: `magnetic vector-field instrument plot`
- Reference: `magnetic vector-field instrument plot`
- Anti-reference: `generic cursor particle toy`

## Inputs

- Interaction: `time+cursor`
- Primitive: `lines`
- Palette: `#05070b`, `#b8eaff`, `#4ba7ff`, `#ffffff`
- Motion rule: Strokes rotate and pull slightly around one cursor target.
- Dominant parameter: `fieldTarget`

## Constraints

- Performance budget: 180 line segments, one position update per frame, no postprocessing.
- Mobile policy: `reduced`: field remains readable without precise cursor input.
- Motion comfort: `low`: local line rotation and pull only; freeze drift when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Short strokes make the vector-field language visible without labels.
- Motion decision: One cursor-centered field rule plus tiny seeded drift.
- Interaction decision: Cursor maps directly to the measured field target.
- Simplification pass: No trails, no color cycling, no physics solver.

## Rubric

- Clarity: `4`
- Novelty: `3`
- Performance: `5`
- Implementation: `3`
- Taste: `2`
- Total: `17`

## Verdict

Prototype. A decent start, but not as strong as magnetic-field or grid-magnet.

## Decision Log

- `2026-05-05`: Created after magnetic-field graded as best.
- `2026-05-05`: Regraded as decent start after explicit grading.
