# Wave Curtain

## Contract

- Slug: `wave-curtain`
- Seed: `wave-curtain-001`
- Status: `failed`
- Grade: `F`
- Placement: `archive`

## Idea

A striped plane folds in shallow waves like an abstract material sample.

## Novelty

- Claim: The novelty is a single folded stripe surface rather than a simulated fabric scene.
- Axis: `technique`

## Visual Direction

- Primary: `material-abstraction`
- Qualifier: `folded stripe sample`
- Reference: `abstract folded textile sample`
- Anti-reference: `realistic curtain render`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#0d0b1f`, `#0c0b1f`, `#a19dff`
- Motion rule: The plane bends in one slow vertical wave while stripe phase drifts slightly.
- Dominant parameter: `foldAmplitude`

## Constraints

- Performance budget: one segmented plane, short shader pair, no lights, no postprocessing.
- Mobile policy: `required`: same plane on mobile with capped DPR.
- Motion comfort: `low`: slow lateral folds; freeze shader time when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Vertical stripes make the deformation visible without adding objects.
- Motion decision: One fold motion controls both geometry and stripe phase.
- Interaction decision: No cursor interaction; it would turn into a cloth toy.
- Simplification pass: Removed lighting and kept color to a narrow violet range.

## Rubric

- Clarity: `1`
- Novelty: `1`
- Performance: `2`
- Implementation: `2`
- Taste: `1`
- Total: `7`

## Verdict

Failed/archive. Weak enough to leave the main gallery.

## Decision Log

- `2026-05-04`: Created as batch 2 effect with one folded shader plane.
- `2026-05-04`: Regraded as weak after explicit project grading.
- `2026-05-04`: Archived after latest project grading.
