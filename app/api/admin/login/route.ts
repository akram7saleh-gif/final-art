import { verifyAdminCredentials, createAdminSession } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    console.log('[v0] Login attempt:', { username })

    if (!username || !password) {
      console.log('[v0] Missing credentials')
      return NextResponse.json(
        { error: 'اسم المستخدم وكلمة المرور مطلوبان' },
        { status: 400 }
      )
    }

    const isValid = await verifyAdminCredentials(username, password)
    console.log('[v0] Credentials verification result:', isValid)
    
    if (!isValid) {
      console.log('[v0] Invalid credentials provided')
      return NextResponse.json(
        { error: 'بيانات المستخدم غير صحيحة' },
        { status: 401 }
      )
    }

    console.log('[v0] Creating admin session')
    await createAdminSession()
    console.log('[v0] Login successful')

    return NextResponse.json({ success: true }) // ✅ تم التصحيح
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'فشل تسجيل الدخول' },
      { status: 500 }
    )
  }
}