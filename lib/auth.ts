import { cookies } from 'next/headers'
import crypto from 'crypto'

const ADMIN_USERNAME = '780090070'
const ADMIN_PASSWORD = '780090070'
const SESSION_SECRET = 'final-art-admin-secret-key-2024'

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  console.log('[v0] Verifying credentials:', { username, expectedUsername: ADMIN_USERNAME })
  const isValid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD
  console.log('[v0] Credentials valid:', isValid)
  return isValid
}

export async function createAdminSession() {
  const sessionId = crypto.randomBytes(32).toString('hex')
  const cookieStore = await cookies()
  
  cookieStore.set('admin-session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
  })
  
  return sessionId
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  return cookieStore.get('admin-session')?.value
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-session')
}

export async function isAdminAuthenticated() {
  const session = await getAdminSession()
  return !!session
}
