'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EquipmentProductsGrid from '@/components/EquipmentProductsGrid'
import RentalBookingDialog from '@/components/RentalBookingDialog'
import PurchaseDialog from '@/components/PurchaseDialog'

interface Product {
  id: number
  name: string
  type: 'sale' | 'rent'
  location: 'sale' | 'rent' | 'equipment'
  price: number
  description?: string
  image?: string
}

export default function EquipmentPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedRentalProduct, setSelectedRentalProduct] = useState<Product | null>(null)
  const [selectedPurchaseProduct, setSelectedPurchaseProduct] = useState<Product | null>(null)
  const [rentalDialogOpen, setRentalDialogOpen] = useState(false)
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const allProducts = await response.json()
          // Show all products on equipment page
          setProducts(allProducts)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleRentProduct = (product: Product) => {
    setSelectedRentalProduct(product)
    setRentalDialogOpen(true)
  }

  const handleBuyProduct = (product: Product) => {
    setSelectedPurchaseProduct(product)
    setPurchaseDialogOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/10 to-transparent py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              المعدات والإكسسوارات
            </h1>
            <p className="text-lg text-muted-foreground">
              استعرض جميع معدات التصوير المتاحة للبيع والتأجير
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <p className="text-center text-muted-foreground">جاري التحميل...</p>
            ) : (
              <EquipmentProductsGrid 
                products={products}
                onRent={handleRentProduct}
                onBuy={handleBuyProduct}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />

      {selectedRentalProduct && (
        <RentalBookingDialog
          product={selectedRentalProduct}
          open={rentalDialogOpen}
          onOpenChange={setRentalDialogOpen}
        />
      )}

      {selectedPurchaseProduct && (
        <PurchaseDialog
          product={selectedPurchaseProduct}
          open={purchaseDialogOpen}
          onOpenChange={setPurchaseDialogOpen}
        />
      )}
    </div>
  )
}
