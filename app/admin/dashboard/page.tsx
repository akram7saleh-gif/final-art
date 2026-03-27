'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import AdminProductForm from '@/components/AdminProductForm'
import AdminProductsList from '@/components/AdminProductsList'

export default function AdminDashboard() {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<any | null>(null)

  useEffect(() => {
    checkAuth()
    fetchProducts()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/check', {
        credentials: 'include'
      })

      if (!response.ok) {
        router.push('/admin/login')
        return
      }
    } catch (error) {
      console.error(error)
      router.push('/admin/login')
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')

      if (!response.ok) {
        console.error('[API ERROR]', response.status, await response.text())
        setProducts([])
        return
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        console.error('[INVALID DATA]', data)
        setProducts([])
        return
      }

      setProducts(data)
    } catch (error) {
      console.error('Fetch error:', error)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/')
  }

  const handleProductSubmit = async (formData: any) => {
    try {
      const method = editingProduct ? 'PUT' : 'POST'
      const url =
        editingProduct?.id
          ? `/api/products/${editingProduct.id}`
          : '/api/products'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowForm(false)
        setEditingProduct(null)
        fetchProducts()
      } else {
        console.error(await response.text())
      }
    } catch (error) {
      console.error('Save error:', error)
    }
  }

const handleDelete = async (productId: string) => {
  console.log('🔥 DELETE CLICK ID:', productId)

  if (!productId) {
    alert('❌ المنتج لا يحتوي على ID')
    return
  }

  if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchProducts()
      } else {
        console.error(await response.text())
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }
}

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-white p-6 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image
                src="/images/final-art-logo.jpg"
                alt="Final Art"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">لوحة تحكم Final Art</h1>
              <p className="text-sm opacity-90">إدارة المنتجات</p>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white/20 hover:bg-white/30 border-white text-white"
          >
            تسجيل خروج
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">إدارة المنتجات</h2>

          <Button
            onClick={() => {
              setEditingProduct(null)
              setShowForm(!showForm)
            }}
          >
            {showForm ? 'إلغاء' : '+ إضافة منتج'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8 p-6">
            <AdminProductForm
              product={editingProduct}
              onSubmit={handleProductSubmit}
              onCancel={() => {
                setShowForm(false)
                setEditingProduct(null)
              }}
            />
          </Card>
        )}

        <Card className="p-6">
          {isLoading ? (
            <p>جاري التحميل...</p>
          ) : products.length === 0 ? (
            <p>لا توجد منتجات</p>
          ) : (
            <AdminProductsList
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </Card>
      </div>
    </div>
  )
}