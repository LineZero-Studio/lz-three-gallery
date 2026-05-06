import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#151515] px-5 py-5 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-7xl flex-col">
        <header className="flex items-center justify-between border-b border-white/15 pb-5 text-[11px] font-semibold uppercase tracking-[0.24em]">
          <Link href="/" className="transition hover:text-[#e21c39]">
            LZ Three Lab
          </Link>
          <nav className="flex gap-6">
            <Link href="/effects" className="text-[#e21c39] transition hover:text-white">
              Effects
            </Link>
            <a href="https://github.com/LineZero-Studio/lz-three-gallery" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#e21c39]">
              GitHub
            </a>
          </nav>
        </header>

        <section className="grid flex-1 content-end gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16 lg:py-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e21c39]">Experiment Findings</p>
            <h1 className="mt-6 max-w-5xl text-[clamp(4rem,12vw,11rem)] font-semibold leading-[0.84] tracking-[-0.08em]">
              Small WebGL effects. Blunt grades.
            </h1>
          </div>

          <aside className="border-t border-white/15 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="text-lg leading-7 tracking-[-0.03em] text-white/70">
              A R3F sketchbook where every effect is a recorded experiment. The ones that work get shown. The ones that do not get labeled and archived.
            </p>
            <Link
              href="/effects"
              className="mt-8 block border border-[#e21c39] px-5 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-[#e21c39] transition hover:bg-[#e21c39] hover:text-white"
            >
              Browse findings
            </Link>
          </aside>
        </section>

        <footer className="grid gap-3 border-t border-white/15 pt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:grid-cols-3">
          <span>A/B keepers</span>
          <span>C prototypes</span>
          <span>D/F archive</span>
        </footer>
      </div>
    </main>
  )
}