'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PurchaseProductsGrid from '@/components/PurchaseProductsGrid'
import PurchaseDialog from '@/components/PurchaseDialog'
import SellProductDialog from '@/components/SellProductDialog'

interface Product {
  id: number
  name: string
  type: 'sale' | 'rent'
  location: 'sale' | 'rent' | 'equipment'
  price: number
  image?: string
  description?: string
}

export default function PurchasePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const [sellDialogOpen, setSellDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const allProducts = await response.json()
          // Filter products for sale page
          const saleProducts = allProducts.filter((p: Product) => p.location === 'sale' || p.type === 'sale')
          setProducts(saleProducts)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleBuyProduct = (product: Product) => {
    setSelectedProduct(product)
    setPurchaseDialogOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/10 to-transparent py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              خدمة الشراء
            </h1>
            <p className="text-lg text-muted-foreground">
              اشتر أفضل معدات التصوير الاحترافية أو بع منتجاتك القديمة
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <p className="text-center text-muted-foreground">جاري التحميل...</p>
            ) : (
              <PurchaseProductsGrid 
                products={products} 
                onBuy={handleBuyProduct}
                onSell={() => setSellDialogOpen(true)}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />

      {selectedProduct && (
        <PurchaseDialog
          product={selectedProduct}
          open={purchaseDialogOpen}
          onOpenChange={setPurchaseDialogOpen}
        />
      )}

      <SellProductDialog
        open={sellDialogOpen}
        onOpenChange={setSellDialogOpen}
      />
    </div>
  )
}
