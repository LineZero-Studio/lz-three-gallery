# Journey Archive

## Contract

- Slug: `journey`
- Seed: `journey-archive-001`
- Status: `failed`
- Grade: `F`
- Placement: `archive`

## Idea

A minimal airplane sketch marks the previous journey scene as archived failed work.

## Novelty

- Claim: The novelty is the archive decision: preserve the plane-journey attempt as a labeled failure instead of hiding it.
- Axis: `composition`

## Visual Direction

- Primary: `lo-fi-webgl`
- Qualifier: `postmortem sketch`
- Reference: `low-poly airplane sketch kept as a postmortem`
- Anti-reference: `fake cinematic cloud-flight scene`

## Inputs

- Interaction: `time`
- Primitive: `mixed`
- Palette: `#8bbfd4`, `#5f8790`, `#f4f0df`, `#dbeef3`
- Motion rule: The plane drifts slightly in place without pretending to create a full journey.
- Dominant parameter: `driftAmplitude`

## Constraints

- Performance budget: under 12 meshes, basic materials, no shader clouds, no postprocessing.
- Mobile policy: `required`: same small mesh count on mobile.
- Motion comfort: `low`: slight drift only; freeze motion when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: Keep only the airplane, horizon slab, and three cloud blobs.
- Motion decision: Remove camera travel and volumetric cloud motion from the registry route.
- Interaction decision: No scroll interaction is used here because it did not rescue the original idea.
- Simplification pass: Archived instead of rebuilding during this batch.

## Rubric

- Clarity: `1`
- Novelty: `1`
- Performance: `2`
- Implementation: `2`
- Taste: `1`
- Total: `7`

## Verdict

Failed/archive. The original journey direction was overbuilt and generic; this route keeps the lesson accessible without pretending it is a finished effect.

## Decision Log

- `2026-05-04`: Registered as archived failed work per the visual-director contract.
