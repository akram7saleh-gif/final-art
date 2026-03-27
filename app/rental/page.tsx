'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RentalProductsGrid from '@/components/RentalProductsGrid'
import RentalBookingDialog from '@/components/RentalBookingDialog'

interface Product {
  id: number
  name: string
  type: 'sale' | 'rent'
  location: 'sale' | 'rent' | 'equipment'
  price: number
  image?: string
  description?: string
}

export default function RentalPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const allProducts = await response.json()
          // Filter products for rental page
          const rentalProducts = allProducts.filter((p: Product) => p.location === 'rent' || p.type === 'rent')
          setProducts(rentalProducts)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleBookProduct = (product: Product) => {
    setSelectedProduct(product)
    setBookingDialogOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/10 to-transparent py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              خدمة التأجير
            </h1>
            <p className="text-lg text-muted-foreground">
              استأجر أفضل معدات التصوير الاحترافية بأسعار منافسة
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <p className="text-center text-muted-foreground">جاري التحميل...</p>
            ) : (
              <RentalProductsGrid products={products} onBook={handleBookProduct} />
            )}
          </div>
        </section>
      </main>

      <Footer />

      {selectedProduct && (
        <RentalBookingDialog
          product={selectedProduct}
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
        />
      )}
    </div>
  )
}
