import { isAdminAuthenticated } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    console.log('[v0] Admin auth check:', isAuthenticated)
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    return NextResponse.json({ authenticated: true })
  } catch (error) {
    console.error('[v0] Auth check error:', error)
    return NextResponse.json(
      { error: 'Auth check failed' },
      { status: 500 }
    )
  }
}