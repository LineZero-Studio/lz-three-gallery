# Individual Effect Contract

Use this root file as the deterministic visual-direction contract for every effect. Each individual effect must also own `effects/<slug>/effect.md` as its case file.

The system optimizes for exploration speed and honest technical novelty. It should produce many small effects quickly, grade them bluntly, and archive failures instead of pretending they are good.

## Prime Directive

Create one clear visual idea with the smallest implementation that makes it readable.

Low fidelity is acceptable. Unclear high fidelity is failure.

## Hard Rules

- Every effect must declare a visual direction before code starts.
- Every effect must declare a stable seed, even if it does not currently use randomness.
- Every effect must own `effects/<slug>/effect.md` as a full case file.
- Every effect must use no new assets.
- Every effect must use a very strict performance budget by default.
- Every effect must be graded with the rubric in this file.
- Failed effects stay accessible in a separate archive, not the main gallery.
- Do not add Leva, FPS counters, debug panels, or hidden media by default.
- Do not add imported 3D models.
- Do not add remote media.

## Banned Patterns

These patterns are blocked unless the case file explicitly proves they are the effect itself:

- Fake cinematic scenes.
- Placeholder game-like scenes.
- Volumetric clouds or atmospheric systems.
- Generic particle clouds with no composition rule.
- Muddy long shaders whose output cannot be described simply.
- Complex camera movement used to hide weak composition.
- Realism attempts where abstraction would read better.

## Required Inputs

Before creating an effect, define these fields in `effects/<slug>/effect.md`:

- `slug`: kebab-case directory name.
- `title`: human-readable name.
- `seed`: stable string or integer used for all randomness.
- `oneSentenceIdea`: one sentence describing what the viewer should see.
- `noveltyClaim`: one sentence naming the novelty.
- `noveltyAxis`: `technique`, `composition`, `interaction`, or `mixed`.
- `interaction`: `time`, `scroll`, `cursor`, `time+scroll`, `time+cursor`, `scroll+cursor`, `all`, or `none`.
- `visualPrimitive`: `points`, `lines`, `planes`, `shader`, `text`, or `mixed`.
- `visualDirection`: one primary value from the taxonomy below.
- `reference`: what the effect should resemble.
- `antiReference`: what the effect must not resemble.
- `palette`: 2 to 4 colors max.
- `motionRule`: one sentence describing the dominant motion.
- `dominantParameter`: the one parameter that most controls the effect.
- `mobilePolicy`: the effect-specific mobile expectation.
- `motionComfort`: the effect-specific motion comfort risk and reduced-motion behavior.
- `failureCondition`: one sentence describing when to stop and simplify.

Example:

```ts
{
  slug: 'radial-pulse',
  title: 'Radial Pulse',
  seed: 'radial-pulse-001',
  oneSentenceIdea: 'Thin rings expand from the center and fade out.',
  noveltyClaim: 'The novelty is the strict time-staggered ring lifecycle.',
  noveltyAxis: 'composition',
  interaction: 'time',
  visualPrimitive: 'lines',
  visualDirection: 'minimal-graphic',
  reference: 'Swiss poster motion study',
  antiReference: 'music visualizer tunnel',
  palette: ['#050505', '#ffffff'],
  motionRule: 'Every ring increases radius over time and fades as it expands.',
  dominantParameter: 'ringLifetime',
  mobilePolicy: 'required: same composition with fewer rings if needed',
  motionComfort: 'low risk: pause expansion when reduced motion is requested',
  failureCondition: 'If the rings do not read as pulses within 5 seconds, remove secondary motion.'
}
```

## Visual Direction Taxonomy

Each effect must choose exactly one primary visual direction. It may add one custom qualifier in the case file, but the primary must come from this list.

- `minimal-graphic`: flat, geometric, high-contrast, poster-like.
- `lo-fi-webgl`: simple 3D primitives, low-poly depth, obvious construction.
- `editorial-motion`: text, image, layout, crop, slice, or reading rhythm.
- `shader-study`: one focused procedural material or screen-space idea.
- `scientific-diagram`: field lines, plots, instruments, scans, maps, or measurement language.
- `terminal-diagnostic`: monochrome or limited-color technical UI language.
- `arcade-vector`: simple vector-game motion, grids, trails, or targets.
- `optical-print`: moire, stripes, halftone, poster texture, or screenprint logic.
- `material-abstraction`: one abstract material behavior without realism pressure.
- `kinetic-type`: typography as the main moving object.

## Reference And Anti-Reference

Every effect must declare both:

- `reference`: the intended visual neighborhood.
- `antiReference`: the visual failure mode to avoid.

The anti-reference is mandatory. It prevents generic output.

Examples:

- Reference: `scientific wind map`; anti-reference: `screensaver noise`.
- Reference: `terminal oscilloscope`; anti-reference: `random neon cyberpunk`.
- Reference: `flat Bauhaus poster`; anti-reference: `generic particle burst`.

## Required Files

Each effect directory must contain:

```txt
effects/<slug>/
  Scene.tsx
  meta.ts
  effect.md
```

Optional files:

- `Shader.ts`: only if a shader is the simplest correct implementation.
- `utils.ts`: only if it removes real duplication or isolates deterministic math.
- `types.ts`: only if the effect has meaningful local types.

There is no hard file-count cap if the grade is honest, but complexity must be documented in `effects/<slug>/effect.md`.

## Per-Effect Case File Template

Every `effects/<slug>/effect.md` must use this structure:

```md
# <Effect Title>

## Contract

- Slug: `<slug>`
- Seed: `<stable-seed>`
- Status: `showcase|solid|prototype|failed`
- Grade: `A|B|C|D|F`
- Placement: `main|archive`

## Idea

<one sentence>

## Novelty

- Claim: <one sentence>
- Axis: `technique|composition|interaction|mixed`

## Visual Direction

- Primary: `<taxonomy-value>`
- Qualifier: `<optional custom qualifier>`
- Reference: `<what it should resemble>`
- Anti-reference: `<what it must not resemble>`

## Inputs

- Interaction: `<value>`
- Primitive: `<value>`
- Palette: `<2-4 colors>`
- Motion rule: `<one sentence>`
- Dominant parameter: `<one parameter>`

## Constraints

- Performance budget: `<specific counts or limits>`
- Mobile policy: `<required|reduced|desktop-primary|not-supported plus reason>`
- Motion comfort: `<risk plus reduced-motion behavior>`
- Asset policy: `no new assets`

## Build Notes

- Static composition decision: `<note>`
- Motion decision: `<note>`
- Interaction decision: `<note>`
- Simplification pass: `<none or summary>`

## Rubric

- Clarity: `<1-5>`
- Novelty: `<1-5>`
- Performance: `<1-5>`
- Implementation: `<1-5>`
- Taste: `<1-5>`
- Total: `<5-25>`

## Verdict

<blunt visual-director critique explaining the grade and placement>

## Decision Log

- `<date>`: `<decision>`
```

## Metadata Template

```ts
import type { EffectMeta } from '../types'

export const meta: EffectMeta = {
  slug: '<slug>',
  title: '<title>',
  status: 'prototype',
  qualityGrade: 'C',
  placement: 'main',
  seed: '<stable-seed>',
  interaction: '<time|scroll|cursor|time+scroll|time+cursor|scroll+cursor|all|none>',
  visualDirection: '<taxonomy-value>',
  noveltyAxis: '<technique|composition|interaction|mixed>',
  description: '<one sentence>',
  constraints: [
    'no new assets',
    '<performance or simplicity constraint>'
  ]
}
```

## Status Rules

- `showcase`: clear immediately, visually distinct, build-ready, technically controlled, no debug UI.
- `solid`: readable and usable, but not exceptional.
- `prototype`: idea is visible but rough.
- `failed`: unclear, broken, too expensive, too generic, or mostly placeholder.

## Placement Rules

- `main`: `showcase`, `solid`, and acceptable `prototype` effects.
- `archive`: all `failed` effects and any effect kept mainly as a lesson.

Failed effects are not deleted. They are labeled and separated.

## Rubric Scoring

Score each category from 1 to 5.

Clarity:

- `5`: reads immediately without explanation.
- `3`: understandable after a few seconds.
- `1`: unclear or misleading.

Novelty:

- `5`: distinct technique, composition, or interaction.
- `3`: familiar idea with a specific twist.
- `1`: generic or copied pattern.

Performance:

- `5`: comfortably within strict budget.
- `3`: acceptable but needs limits or reduced mode.
- `1`: heavy, unstable, or unjustified.

Implementation:

- `5`: small, deterministic, typed, and easy to reason about.
- `3`: works but has rough edges.
- `1`: broken, stateful in the wrong places, or hard to maintain.

Taste:

- `5`: visually intentional and restrained.
- `3`: acceptable but ordinary.
- `1`: generic, muddy, or ugly in an unproductive way.

Grade mapping:

- `A`: 22-25
- `B`: 18-21
- `C`: 13-17
- `D`: 8-12
- `F`: 5-7

Grade caps:

- Typecheck failure caps grade at `F`.
- Build failure caps grade at `F`.
- Missing `effects/<slug>/effect.md` caps grade at `F`.
- Missing seed caps grade at `F`.
- New asset dependency blocks the effect until redesigned.
- Visible debug UI caps grade at `C`.
- No clear novelty claim caps grade at `C`.
- No anti-reference caps grade at `C`.
- Generic particles with no composition rule cap grade at `D`.
- Fake scene scaffolding caps grade at `D` unless the scene itself is the effect and reads clearly.

## Deterministic Build Gates

1. Write `effects/<slug>/effect.md` first.
2. Declare seed, visual direction, reference, anti-reference, novelty claim, and failure condition.
3. Pick exactly one primary primitive family.
4. Pick one dominant motion rule.
5. Pick one dominant parameter.
6. Create `meta.ts`.
7. Create `Scene.tsx` with static composition only.
8. Apply the static read gate.
9. Add motion only after the static composition reads.
10. Apply the motion read gate.
11. Add interaction only if it improves readability.
12. Apply the interaction read gate.
13. Run typecheck.
14. Score the rubric.
15. If the grade is `D` or `F`, perform one simplification pass.
16. Re-score after simplification.
17. If still `D` or `F`, place in archive with a blunt verdict.

## Expansion Gates

Static read gate:

- The still composition must communicate the visual direction.
- The first focal point must be obvious.
- Removing motion should not make the effect meaningless unless motion is the stated primitive.

Motion read gate:

- One dominant motion must be identifiable.
- Secondary motion is forbidden until the dominant motion works.
- The motion must support the one-sentence idea.

Interaction read gate:

- Each interaction must map to one obvious visual change.
- Combining interactions is allowed, but one must remain primary.
- If interaction makes the effect less readable, remove it.

## Performance Budget

Default budget is very strict. Override only in the per-effect case file with justification.

- No ray marching by default.
- No postprocessing by default.
- No shadows by default.
- No remote media.
- No new assets.
- No more than one `Canvas` per effect.
- Prefer one material family.
- Prefer one geometry family.
- Keep mesh counts low.
- Keep point counts intentionally bounded.
- Avoid per-frame React state updates.
- Avoid per-frame object allocation inside `useFrame`.
- Avoid shader loops with high sample counts.

Suggested starting limits:

- Meshes: 1-100.
- Points: 100-2,000.
- Lines: 10-300.
- Plane segments: 1-128 per axis.
- Shader source: under 200 lines.
- Per-frame allocations: zero after initialization.

## Asset Policy

No new assets.

- Do not add images, videos, fonts, models, LUTs, HDRIs, or audio.
- Do not load remote assets.
- Do not add hidden media elements.
- Do not add new dependencies to compensate for missing assets.

If an effect appears to require a new asset, block it and redesign with generated geometry, text, color, or shader logic.

## Randomness Policy

Every effect must declare a seed.

- All random layout, timing, color variation, and motion offsets must be derived from the seed.
- Do not use `Math.random()` directly in render or frame loops.
- Do not allow composition to change unpredictably between reloads.
- If no randomness is currently used, keep the seed for future deterministic changes.

## Scene Constraints

- Prefer one React component in `Scene.tsx` until it becomes harder to read.
- Prefer arrays and loops over many handwritten meshes.
- Keep colors intentional and limited.
- Avoid physical realism unless it is the declared visual idea.
- Avoid imported 3D models.
- Avoid Leva controls by default.
- Avoid FPS counters by default.
- Avoid React state inside `useFrame`; use refs for frame-local animation.
- Avoid expensive per-frame object allocation inside `useFrame`.
- Dispose manually created geometries/materials when needed.

## Shader Constraints

- Use a shader only when it is simpler than mesh code.
- Keep uniforms minimal.
- Use time, resolution, scroll, and cursor only if needed.
- Avoid long copied shader systems.
- Avoid ray marching unless the effect cannot exist without it and the case file accepts the performance cost.
- If the shader exceeds 200 lines, justify it in the case file.
- If the shader output is visually muddy, simplify before adding more math.

## Interaction Rules

All interaction types are allowed, but each effect must choose what it actually uses.

Time:

- Must animate without user input.
- Must loop or evolve without obvious resets.

Scroll:

- Scroll progress must map to one obvious visual change.
- Do not require long scrolling before anything happens.
- Scroll should visibly affect the effect in the first screen of movement.

Cursor:

- Must still look acceptable without cursor movement.
- Cursor response should be immediate and legible.
- Cursor influence must not destroy the base composition.

None:

- Must be compositionally strong as a still image.

## Mobile And Motion Comfort

Each effect declares its own mobile policy and motion comfort policy.

Mobile policy options:

- `required`: same effect must work on mobile.
- `reduced`: mobile may use lower counts or simpler motion.
- `desktop-primary`: mobile must not crash, but desktop is the visual target.
- `not-supported`: allowed only for archived prototypes with a clear reason.

Motion comfort policy must state:

- Risk level: `low`, `medium`, or `high`.
- Reduced-motion behavior.
- Whether flashing, rapid zoom, or strong parallax exists.

## The 5-Second Test

After implementation, answer these questions in the case file:

- What is moving?
- Why is it moving?
- What is technically novel here?
- What is the viewer supposed to notice first?
- Does the reference show up in the result?
- Does the anti-reference remain avoided?
- Can the effect be described in one sentence without lying?
- Would removing half the elements make it clearer?

If the answers are weak, simplify.

## Simplification Ladder

When an effect is weak, simplify in this order:

1. Remove secondary motion.
2. Reduce colors.
3. Reduce object count.
4. Remove camera movement.
5. Remove lighting complexity.
6. Replace 3D with flat planes or lines.
7. Replace realism with abstraction.
8. Reduce interaction to one input.
9. Reduce shader math.
10. Archive as `failed` if it still does not read.

## Review Checklist

Before calling an effect done:

- The per-effect `effect.md` exists.
- The effect has a stable seed.
- The effect has a clear one-sentence idea.
- The effect has a novelty claim.
- The effect has a visual direction from the taxonomy.
- The effect has a reference and anti-reference.
- The implementation matches the metadata.
- The scene works full-screen.
- The scene works without debug UI.
- No new assets were introduced.
- No hidden remote media loads unexpectedly.
- No TypeScript errors were introduced.
- No obvious unused imports remain.
- The rubric is scored.
- The grade is honest.
- Failed work is archived, not disguised.
