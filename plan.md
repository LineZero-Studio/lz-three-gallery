# Effects Roadmap

## Goal

Create a root-level `effects/` system for a collection of small, readable visual effects. Favor low-fidelity ideas that execute cleanly over high-fidelity scenes that look unfinished.

The standard is not cinematic realism. The standard is clarity.

## Guiding Rule

If an effect does not read clearly within 5 seconds, simplify it.

## Scope

Add 20 new effects and fold the existing effects into a shared structure.

Existing effects:

- `liquid`: keep and polish as a stronger existing effect.
- `bulge`: keep as a rough/prototype effect unless improved.
- `journey`: keep only as failed/prototype reference unless rebuilt from first principles.

New effects:

1. `tunnel-lines`: moving line tunnel with simple depth motion.
2. `orbit-dots`: dots orbiting around the center with scale-based depth.
3. `scan-grid`: grid with a scanning highlight band.
4. `ripple-field`: circular ripples from center or cursor.
5. `depth-cards`: flat cards drifting through z-space.
6. `noise-wind`: low-detail displaced plane with slow directional noise.
7. `soft-blobs`: simple 2D shader blobs.
8. `pixel-sort-fake`: horizontal color/image bands offset over time.
9. `cursor-gravity`: particles pulled toward cursor.
10. `radial-pulse`: expanding rings fading outward.
11. `wire-terrain`: simple wire plane moving forward.
12. `falling-bars`: vertical bars falling at varied speeds.
13. `wave-curtain`: sine-displaced curtain plane.
14. `image-slice`: image split into offset horizontal strips.
15. `particle-rain`: sparse points falling through depth.
16. `metaball-flat`: flat shader circles with basic blend feel.
17. `scroll-stripes`: scroll-controlled stripe distortion.
18. `constellation`: points connected by short nearby lines.
19. `feedback-planes`: repeated translucent planes receding into depth.
20. `type-drift`: floating text fragments with slow drift.

## Target Structure

```txt
effects/
  types.ts
  registry.ts
  shared/
    EffectCanvas.tsx
    FullscreenEffectPage.tsx
  liquid/
    Scene.tsx
    meta.ts
  bulge/
    Scene.tsx
    meta.ts
  journey/
    Scene.tsx
    meta.ts
  tunnel-lines/
    Scene.tsx
    meta.ts
  ...
```

Routes:

- `app/effects/page.tsx`: effect gallery and index.
- `app/effects/[slug]/page.tsx`: dynamic effect page.
- Existing direct routes can remain temporarily, but the registry should become the source of truth.

## Effect Metadata

Each effect should have metadata:

- `slug`
- `title`
- `status`: `showcase`, `solid`, `prototype`, or `failed`
- `qualityGrade`: `A`, `B`, `C`, `D`, or `F`
- `interaction`: `time`, `scroll`, `cursor`, or `none`
- `description`
- `constraints`

The metadata must be honest. Do not call weak work `showcase`.

## Quality Bar

An effect is acceptable when:

- The core visual idea is visible without explanation.
- It has one dominant motion or interaction.
- It works full-screen on desktop and mobile.
- It does not expose debug UI by default.
- It does not require complex assets unless the asset is central to the idea.
- It avoids expensive shader complexity unless the visual payoff is obvious.
- TypeScript passes.
- The app builds.

## Anti-Goals

- Do not make cinematic placeholder scenes.
- Do not add volumetric clouds, aircraft, terrain systems, or fake game scenes unless the base visual already works.
- Do not use high complexity to hide a weak idea.
- Do not add Leva controls by default.
- Do not ship FPS counters by default.
- Do not create complex object hierarchies when flat geometry or a shader is enough.

## Implementation Order

1. Create `effects/` structure, shared types, and registry.
2. Create `/effects` gallery route.
3. Create `/effects/[slug]` dynamic route.
4. Register existing `liquid`, `bulge`, and `journey` with honest statuses.
5. Implement effects in batches of five.
6. After each batch, run typecheck and build.
7. Grade each effect immediately after implementation.
8. Simplify or mark as `failed` if the effect is unclear.
9. Remove visible debug UI and unused controls.
10. Update README with the effect index and development commands.

## Batch Plan

Batch 1:

- `tunnel-lines`
- `orbit-dots`
- `scan-grid`
- `ripple-field`
- `radial-pulse`

Batch 2:

- `wire-terrain`
- `wave-curtain`
- `falling-bars`
- `particle-rain`
- `constellation`

Batch 3:

- `depth-cards`
- `feedback-planes`
- `type-drift`
- `scroll-stripes`
- `cursor-gravity`

Batch 4:

- `noise-wind`
- `soft-blobs`
- `pixel-sort-fake`
- `image-slice`
- `metaball-flat`

## Done Criteria

- `effects/` exists and owns effect registration.
- `/effects` lists all existing and new effects.
- `/effects/[slug]` renders every registered effect.
- 20 new effects exist.
- Existing effects are included with honest quality labels.
- `npm run build` passes.
- `npx tsc --noEmit --incremental false` passes.
- No default debug overlays are visible.
