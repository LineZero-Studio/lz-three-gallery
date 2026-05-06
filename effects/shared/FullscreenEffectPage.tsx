'use client'

import EffectCanvas from './EffectCanvas'
import type { EffectDefinition } from '../types'

interface FullscreenEffectPageProps {
  effect: EffectDefinition
}

export default function FullscreenEffectPage({ effect }: FullscreenEffectPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#151515] text-white">
      <EffectCanvas effect={effect} />
      <header className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-white/15 bg-[#151515]/80 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] backdrop-blur sm:px-8 lg:px-12">
        <nav className="flex gap-6">
          <a href="/effects" className="transition hover:text-[#e21c39]">
            Effects
          </a>
          <a href="https://github.com/LineZero-Studio/lz-three-gallery" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#e21c39]">
            GitHub
          </a>
        </nav>
        <span className="text-[#e21c39]">Grade {effect.qualityGrade}</span>
      </header>

      <section className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 border-t border-white/15 bg-[#151515]/80 px-5 py-4 backdrop-blur sm:px-8 lg:px-12">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Experiment {effect.slug}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-[-0.05em] md:text-5xl">{effect.title}</h1>
          </div>
          <p className="text-sm leading-6 text-white/62 lg:text-right">{effect.description}</p>
        </div>
      </section>
    </main>
  )
}