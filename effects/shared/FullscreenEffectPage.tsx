'use client'

import EffectCanvas from './EffectCanvas'
import type { EffectDefinition } from '../types'

interface FullscreenEffectPageProps {
  effect: EffectDefinition
}

export default function FullscreenEffectPage({ effect }: FullscreenEffectPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <EffectCanvas effect={effect} />
      <a
        href="/effects"
        className="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-black/45 px-3 py-2 text-xs uppercase tracking-[0.25em] text-white/70 backdrop-blur transition hover:border-white/45 hover:text-white"
      >
        Effects
      </a>
      <section className="pointer-events-none absolute bottom-4 left-4 right-4 z-10 max-w-xl rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur md:bottom-6 md:left-6 md:right-auto md:p-5">
        <div className="mb-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-white/55">
          <span>{effect.status}</span>
          <span>Grade {effect.qualityGrade}</span>
          <span>{effect.placement}</span>
          <span>{effect.visualDirection}</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">{effect.title}</h1>
        <p className="mt-2 text-sm leading-6 text-white/72 md:text-base">{effect.description}</p>
        <p className="mt-3 text-xs leading-5 text-white/45">Seed: {effect.seed}</p>
      </section>
    </main>
  )
}
