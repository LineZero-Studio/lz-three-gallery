# Phase Lock

## Contract

- Slug: `phase-lock`
- Seed: `phase-lock-001`
- Status: `prototype`
- Grade: `C`
- Placement: `main`

## Idea

Two diagnostic traces drift in and out of phase with a lock band appearing at alignment.

## Novelty

- Claim: The novelty is making two traces visibly lock and drift out of phase as the whole composition rule.
- Axis: `composition`

## Visual Direction

- Primary: `terminal-diagnostic`
- Qualifier: `dual phase monitor`
- Reference: `dual signal phase monitor`
- Anti-reference: `music waveform screensaver`

## Inputs

- Interaction: `time`
- Primitive: `shader`
- Palette: `#010207`, `#38d1ff`, `#ff5666`, `#dcf2ff`
- Motion rule: Two traces drift in phase until they briefly lock, then separate again.
- Dominant parameter: `phaseOffset`

## Constraints

- Performance budget: One fullscreen plane, two analytic traces, no postprocessing.
- Mobile policy: `required`: same traces on mobile with capped DPR.
- Motion comfort: `low`: smooth phase drift; freeze phase when reduced motion is requested.
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: The center lock band makes alignment the visual event.
- Motion decision: Slow sinusoidal phase drift avoids flicker.
- Interaction decision: Time-only; the idea is the lock cycle.
- Simplification pass: Kept two traces instead of multi-wave clutter.

## Rubric

- Clarity: `3`
- Novelty: `3`
- Performance: `5`
- Implementation: `4`
- Taste: `3`
- Total: `18`

## Verdict

Prototype after user grading. Restrained and clear enough to keep, but not strong yet.

## Decision Log

- `2026-05-05`: Created for batch 2 as a waveform direction that avoids audio-visualizer tropes.
- `2026-05-05`: User grading set this to `prototype` / `C`.
