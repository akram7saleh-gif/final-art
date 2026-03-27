import { clearAdminSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    await clearAdminSession()
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Logout failed' }, { status: 500 })
  }
}
