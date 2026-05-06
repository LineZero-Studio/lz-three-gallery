# lz-three

A Next.js and React Three Fiber sketchbook for small, bluntly graded visual effects.

The root effects system lives in `effects/`. Each effect owns a `Scene.tsx`, `meta.ts`, and `effect.md` case file. The registry in `effects/registry.ts` is the source of truth for `/effects` and `/effects/[slug]`.

## Commands

```bash
npm run dev
npx tsc --noEmit --incremental false
npm run build
```

Open `http://localhost:3000/effects` to browse the registry.

## Routes

- `/effects`: gallery grouped by main and archive placement.
- `/effects/[slug]`: full-screen registered effect page.
- `/liquid`, `/bulge`, `/journey`: older direct routes kept while the registry becomes the primary entry point.

## Effect Index

Current registry: 46 effects, with 34 in the main gallery and 12 in the archive.

Main effects:

- `magnetic-field`
- `liquid`
- `grid-magnet`
- `falling-bars`
- `ink-bars`
- `cursor-gravity`
- `liquid-grid`
- `probe-grid`
- `hinge-field`
- `signal-cut`
- `slice-lock`
- `field-lines`
- `hyphae-trace`
- `charge-map`
- `ink-register`
- `liquid-mask`
- `field-pulse`
- `binary-slit`
- `scope-trace`
- `threshold-map`
- `phase-lock`
- `vein-map`
- `cell-membrane`
- `sand-spline`
- `reaction-poster`
- `type-drift`
- `ripple-field`
- `particle-rain`
- `pixel-sort-fake`
- `depth-cards`
- `orbit-dots`
- `constellation`
- `soft-blobs`
- `topo-slices`

Archive effects:

- `bitplane-shift`
- `orbit-field`
- `noise-wind`
- `wave-curtain`
- `feedback-planes`
- `scroll-stripes`
- `bulge`
- `wire-terrain`
- `scan-grid`
- `tunnel-lines`
- `radial-pulse`
- `journey`

## Effect Rules

- Keep one clear visual idea per effect.
- Prefer simple geometry and readable motion over cinematic placeholders.
- Do not add Leva controls, FPS counters, imported models, remote media, or debug overlays by default.
- Grade weak work honestly and keep failures accessible in the archive.
- Run typecheck and build after each effect batch.
