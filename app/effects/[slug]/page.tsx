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
      <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-white/45">Effect Not Found</p>
        <h1 className="mt-4 text-4xl font-semibold">No registered effect for `{slug}`</h1>
        <a href="/effects" className="mt-8 rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 transition hover:border-white/50 hover:text-white">
          Back to effects
        </a>
      </main>
    )
  }

  return <FullscreenEffectPage effect={effect} />
}
