# Binary Slit

## Contract

- Slug: `binary-slit`
- Seed: `binary-slit-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

Binary lanes crawl behind a central slit while a blue scanline tests the field.

## Novelty

- Claim: The novelty is a readable data slit where barcode lanes only fully resolve through one central aperture.
- Axis: `composition`

## Visual Direction

- Primary: `terminal-diagnostic`
- Qualifier: `barcode perception test`
- Reference: `Ryoji Ikeda-style barcode perception test`
- Anti-reference: `random TV static`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#010101`, `#e0e5e0`, `#1f8fff`
- Motion rule: Binary lanes move horizontally at deterministic lane speeds behind a fixed slit.
- Dominant parameter: `slitWidth`

## Constraints

- Performance budget: One fullscreen plane, analytic cells, no textures.
- Mobile policy: `required`: same lane count on mobile with capped DPR.
- Motion comfort: `medium`: barcode crawl and scanline; freeze when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: The central slit makes the binary field a visual instrument, not a noise field.
- Motion decision: Lane speeds are slow enough to avoid hard flicker.
- Interaction decision: Time-only preserves the machine-test character.
- Simplification pass: Kept one accent scanline instead of multiple glitch layers.

## Rubric

- Clarity: `3`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `3`
- Total: `18`

## Verdict

Prototype after user grading. The diagnostic direction is useful, but this version needs polish.

## Decision Log

- `2026-05-05`: Created for batch 2 from data/barcode research.
- `2026-05-05`: User grading set this to `prototype` / `C`.
