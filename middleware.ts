import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Création d'un client Supabase adapté au contexte Edge (middleware)
  // Il lit et écrit les cookies de session automatiquement
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Récupère la session — rafraîchit automatiquement le token si expiré
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Si l'utilisateur n'est pas connecté et tente d'accéder à une route protégée
  if (!user && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si l'utilisateur est déjà connecté et tente d'accéder aux pages auth
  if (user && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

// Définit sur quelles routes le middleware s'exécute
// On exclut les fichiers statiques et les assets Next.js pour la performance
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)'],
}
