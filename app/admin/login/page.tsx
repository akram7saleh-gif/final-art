'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      console.log('[v0] Sending login request:', { username })
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      console.log('[v0] Login response:', { status: response.status, data })

      if (!response.ok) {
        setError(data.error || 'فشل تسجيل الدخول')
        return
      }

      console.log('[v0] Login successful, redirecting to dashboard')
      router.push('/admin/dashboard')
    } catch (err) {
      console.error('[v0] Login error:', err)
      setError('حدث خطأ في الاتصال')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <div className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src="/images/final-art-logo.jpg"
                alt="Final Art Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
            <p className="text-muted-foreground mt-2">تسجيل دخول المسؤول</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                اسم المستخدم
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full py-2 font-bold"
              disabled={isLoading}
            >
              {isLoading ? 'جاري التحقق...' : 'دخول'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            © 2024 Final Art - جميع الحقوق محفوظة
          </p>
        </div>
      </Card>
    </div>
  )
}
