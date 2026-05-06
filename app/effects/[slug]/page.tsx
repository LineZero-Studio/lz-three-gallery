'use client'

import { useParams } from 'next/navigation'
import { getEffect } from '@/effects/registry'
import FullscreenEffectPage from '@/effects/shared/FullscreenEffectPage'

export default function EffectSlugPage() {
  const params = useParams<{ slug: string }>()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const effect = getEffect(slug)

  if (!effect) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#151515] px-6 text-center text-white">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e21c39]">Experiment Not Found</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.07em] md:text-7xl">No recorded test for `{slug}`</h1>
        <div className="mt-8 flex flex-col gap-4">
          <a href="/effects" className="border border-[#e21c39] px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#e21c39] transition hover:bg-[#e21c39] hover:text-white">
            Back to findings
          </a>
          <a href="https://github.com/LineZero-Studio/lz-three-gallery" target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 transition hover:text-white">
            View source
          </a>
        </div>
      </main>
    )
  }

  return <FullscreenEffectPage effect={effect} />
}
