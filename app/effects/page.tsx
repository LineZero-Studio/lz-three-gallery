'use client'

import { archiveEffects, mainEffects } from '@/effects/registry'
import type { EffectDefinition } from '@/effects/types'

function EffectCard({ effect }: { effect: EffectDefinition }) {
  return (
    <a
      href={`/effects/${effect.slug}`}
      className="group flex min-h-56 flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.07]"
    >
      <div>
        <div className="mb-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-white/45">
          <span>{effect.status}</span>
          <span>Grade {effect.qualityGrade}</span>
          <span>{effect.visualDirection}</span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">{effect.title}</h2>
        <p className="mt-3 text-sm leading-6 text-white/62">{effect.description}</p>
      </div>
      <div className="mt-6 flex items-center justify-between text-xs text-white/40">
        <span>{effect.slug}</span>
        <span className="transition group-hover:text-white">Open</span>
      </div>
    </a>
  )
}

export default function EffectsPage() {
  const keeperEffects = mainEffects.filter((effect) => effect.qualityGrade === 'A' || effect.qualityGrade === 'B')
  const prototypeEffects = mainEffects.filter((effect) => effect.qualityGrade === 'C')

  return (
    <main className="min-h-screen bg-[#080808] px-5 py-8 text-white md:px-10 md:py-12">
      <section className="mx-auto max-w-6xl">
        <a href="/" className="text-xs uppercase tracking-[0.25em] text-white/45 transition hover:text-white">
          Home
        </a>
        <div className="mt-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/45">Root Effects Registry</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Small Effects, Blunt Grades</h1>
          <p className="mt-5 text-base leading-7 text-white/60 md:text-lg">
            A deterministic visual-effects index. Keepers are the current A/B bar; prototypes stay visible but separated; archived effects remain labeled failures.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold">Keepers</h2>
          <p className="text-sm text-white/40">{keeperEffects.length} effects</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {keeperEffects.map((effect) => (
            <EffectCard key={effect.slug} effect={effect} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold">Working Prototypes</h2>
          <p className="text-sm text-white/40">{prototypeEffects.length} effects</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {prototypeEffects.map((effect) => (
            <EffectCard key={effect.slug} effect={effect} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl pb-12">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold">Archive</h2>
          <p className="text-sm text-white/40">{archiveEffects.length} effects</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {archiveEffects.map((effect) => (
            <EffectCard key={effect.slug} effect={effect} />
          ))}
        </div>
      </section>
    </main>
  )
}
