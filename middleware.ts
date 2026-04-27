import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Le middleware laisse passer toutes les requêtes
// La protection des routes est gérée côté client dans chaque page
// via onAuthStateChange (plus fiable car Supabase stocke la session en localStorage)
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)'],
}
