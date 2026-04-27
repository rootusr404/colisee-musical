import Link from 'next/link'

const steps = [
  { n: '01', title: 'Rejoins une battle', desc: 'Parcours les battles ouvertes et inscris-toi en un clic.' },
  { n: '02', title: 'Produis sur le tatami', desc: 'Utilise le studio intégré avec le sample pack imposé. Enregistre, mixe, exporte.' },
  { n: '03', title: 'Le public vote', desc: 'Les meilleurs sons remontent. Le classement se met à jour en temps réel.' },
]

const perks = [
  { icon: '🎛️', title: 'Studio dans le navigateur', desc: 'Aucune installation. Produis directement depuis Chrome, Firefox ou Safari.' },
  { icon: '⚡', title: 'Temps réel', desc: 'Votes, classements et chat se mettent à jour instantanément.' },
  { icon: '🏆', title: 'Compétition équitable', desc: 'Tous les candidats utilisent le même sample pack. Seul le talent fait la différence.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">

      {/* ── Navbar ── */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-zinc-800/60">
        <span className="font-bold text-xl tracking-tight text-violet-400">Tatami</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition">
            Se connecter
          </Link>
          <Link
            href="/register"
            className="text-sm bg-violet-600 hover:bg-violet-500 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            S'inscrire
          </Link>
        </div>
      </header>

      <main className="flex flex-col flex-1">

        {/* ── Hero ── */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
          {/* Halos décoratifs */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
              La plateforme de battles musicales
            </span>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              Monte sur le{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                tatami.
              </span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
              Affronte d'autres artistes, produis avec les mêmes samples, laisse le public décider.
              Battles asynchrones. Studio intégré. Classement en temps réel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3.5 rounded-xl transition text-base"
              >
                Rejoindre gratuitement
              </Link>
              <Link
                href="/battles"
                className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition text-base"
              >
                Voir les battles →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Comment ça marche ── */}
        <section className="px-6 py-24 max-w-5xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-16">Comment ça marche</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col gap-4">
                <span className="text-4xl font-extrabold text-violet-600/40">{s.n}</span>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pourquoi Tatami ── */}
        <section className="px-6 py-24 bg-zinc-900/50 border-y border-zinc-800">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-16">Pourquoi Tatami</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {perks.map((p) => (
                <div key={p.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-3">
                  <span className="text-3xl">{p.icon}</span>
                  <h3 className="font-semibold text-white">{p.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="px-6 py-24 flex flex-col items-center text-center gap-6">
          <h2 className="text-3xl font-bold">Prêt à entrer sur le tatami ?</h2>
          <p className="text-zinc-400 max-w-md">Crée ton compte en 30 secondes. Aucune carte bancaire requise.</p>
          <Link
            href="/register"
            className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3.5 rounded-xl transition text-base"
          >
            Créer mon compte
          </Link>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-800 px-6 py-6 flex items-center justify-between text-xs text-zinc-600">
        <span>© 2025 Tatami. Tous droits réservés.</span>
        <span>Fait avec 🎵</span>
      </footer>

    </div>
  )
}
