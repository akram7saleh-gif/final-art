import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface Product {
  id: number
  name: string
  type: 'sale' | 'rent'
  location: 'sale' | 'rent' | 'equipment'
  price: number
  description?: string
  image?: string
}

interface Props {
  products: Product[]
  onRent: (product: Product) => void
  onBuy: (product: Product) => void
}

export default function EquipmentProductsGrid({ products, onRent, onBuy }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">لا توجد منتجات حالياً</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{product.name}</CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 space-y-4">
            {product.description && (
              <p className="text-sm text-muted-foreground">{product.description}</p>
            )}
            
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground mb-1">السعر</p>
              <p className="text-2xl font-bold text-primary">
                {product.price.toLocaleString('ar-SA')}
                <span className="text-lg ml-2">ريال</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {product.type === 'sale' ? 'للبيع' : 'للإيجار/يوم'}
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="gap-2">
            <Button 
              variant="outline"
              className="flex-1" 
              onClick={() => onRent(product)}
              size="sm"
            >
              احجز
            </Button>
            <Button 
              className="flex-1"
              onClick={() => onBuy(product)}
              size="sm"
            >
              شراء
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
