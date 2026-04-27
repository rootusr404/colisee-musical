'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Supabase envoie un email avec un lien de réinitialisation
    // redirectTo : l'URL vers laquelle l'utilisateur sera renvoyé après avoir cliqué
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">Mot de passe oublié</h1>
        <p className="text-zinc-400 text-sm mt-1">On t'envoie un lien de réinitialisation</p>
      </div>

      {sent ? (
        <div className="text-center">
          <p className="text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3 text-sm">
            Email envoyé ! Vérifie ta boîte de réception.
          </p>
          <Link href="/login" className="block mt-6 text-sm text-violet-400 hover:text-violet-300 transition">
            ← Retour à la connexion
          </Link>
        </div>
      ) : (
        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-zinc-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="toi@exemple.com"
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2.5 transition"
          >
            {loading ? 'Envoi...' : 'Envoyer le lien'}
          </button>

          <Link href="/login" className="text-center text-sm text-zinc-500 hover:text-zinc-400 transition">
            ← Retour à la connexion
          </Link>
        </form>
      )}
    </div>
  )
}
