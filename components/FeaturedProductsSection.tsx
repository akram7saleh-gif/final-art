'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface Product {
  id: number
  name: string
  type: 'sale' | 'rent'
  location: 'sale' | 'rent' | 'equipment'
  price: number
  image: string
}

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const allProducts = await response.json()
          // Show featured products from different categories
          setProducts(allProducts.slice(0, 4))
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            المنتجات المميزة
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            اختر من أفضل معدات التصوير والكاميرات الاحترافية
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">جاري التحميل...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد منتجات حالياً</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow flex flex-col overflow-hidden">
                  {product.image && (
                    <div className="relative w-full h-48 bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="text-center pb-3">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.price} ريال</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {product.type === 'sale' ? 'للبيع' : 'للإيجار'}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Link href="/rental" className="flex-1">
                      <Button variant="default" className="w-full" size="sm">
                        احجز
                      </Button>
                    </Link>
                    <Link href="/purchase" className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">
                        شراء
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/equipment">
                <Button size="lg">
                  عرض جميع المنتجات
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
