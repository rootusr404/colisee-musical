'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    // onAuthStateChange se déclenche immédiatement avec la session existante
    // puis à chaque changement (connexion, déconnexion, expiration)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
        // Récupère le pseudo depuis la table profiles
        supabase
          .from('profiles')
          .select('username')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => setUsername(data?.username ?? null))
      }
    })

    // Nettoyage de l'écouteur quand le composant est démonté
    return () => subscription.unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  if (!user) return null // le middleware gère la redirection, ceci est un filet de sécurité

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Barre de navigation */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-lg tracking-tight text-violet-400">Tatami</span>
        <button
          onClick={handleSignOut}
          className="text-sm text-zinc-400 hover:text-white transition"
        >
          Déconnexion
        </button>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
        <p className="text-zinc-400 mb-10">Bienvenue, <span className="text-white font-semibold">{username ?? user.email}</span></p>

        {/* Grille de sections — sera remplie au Sprint 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Battles en cours', value: '—' },
            { label: 'Mes soumissions', value: '—' },
            { label: 'Mes likes reçus', value: '—' },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <p className="text-zinc-400 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
