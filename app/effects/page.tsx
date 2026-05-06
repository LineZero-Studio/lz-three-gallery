'use client'

import Link from 'next/link'
import { archiveEffects, mainEffects } from '@/effects/registry'
import type { EffectDefinition } from '@/effects/types'

function EffectRow({ effect, index }: { effect: EffectDefinition; index: number }) {
  return (
    <Link
      href={`/effects/${effect.slug}`}
      className="grid gap-3 border-t border-white/12 py-5 transition hover:border-[#e21c39] md:grid-cols-[64px_minmax(0,1fr)_96px] md:items-start"
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">{String(index + 1).padStart(2, '0')}</span>
      <span>
        <span className="block text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">{effect.title}</span>
        <span className="mt-2 block max-w-2xl text-sm leading-6 text-white/55">{effect.description}</span>
        <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">{effect.slug}</span>
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e21c39] md:text-right">Grade {effect.qualityGrade}</span>
    </Link>
  )
}

function EffectSection({ title, effects }: { title: string; effects: EffectDefinition[] }) {
  return (
    <section className="mx-auto mt-14 max-w-7xl">
      <div className="mb-2 flex items-end justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.24em]">
        <h2 className="text-white">{title}</h2>
        <p className="text-white/35">{effects.length}</p>
      </div>
      <div>
        {effects.map((effect, index) => (
          <EffectRow key={effect.slug} effect={effect} index={index} />
        ))}
      </div>
    </section>
  )
}

export default function EffectsPage() {
  const keeperEffects = mainEffects.filter((effect) => effect.qualityGrade === 'A' || effect.qualityGrade === 'B')
  const prototypeEffects = mainEffects.filter((effect) => effect.qualityGrade === 'C')

  return (
    <main className="min-h-screen bg-[#151515] px-5 py-5 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between border-b border-white/15 pb-5 text-[11px] font-semibold uppercase tracking-[0.24em]">
          <Link href="/" className="transition hover:text-[#e21c39]">
            LZ Three Lab
          </Link>
          <nav className="flex gap-6">
            <span className="text-[#e21c39]">Effects</span>
            <a href="https://github.com/LineZero-Studio/lz-three-gallery" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#e21c39]">
              GitHub
            </a>
          </nav>
        </header>

        <section className="grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e21c39]">Experiment Directory</p>
            <h1 className="mt-6 max-w-4xl text-[clamp(3.5rem,10vw,8.5rem)] font-semibold leading-[0.86] tracking-[-0.08em]">
              Keep what works. Label what does not.
            </h1>
          </div>
          <p className="self-end border-t border-white/15 pt-5 text-lg leading-7 tracking-[-0.03em] text-white/65 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            Each effect is a recorded test. A/B passed. C still running. D/F failed and filed.
          </p>
        </section>

        <EffectSection title="Keepers" effects={keeperEffects} />
        <EffectSection title="Working Prototypes" effects={prototypeEffects} />
        <EffectSection title="Archive" effects={archiveEffects} />
      </div>
    </main>
  )
}