'use client'

import { Button } from '@/components/ui/button'

export default function AdminProductsList({
  products,
  onEdit,
  onDelete,
}: {
  products: any[]
  onEdit: (product: any) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="space-y-4">
      {products.map((product) => {
        console.log('🔥 PRODUCT ITEM:', product)

        return (
          <div
            key={product.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p>السعر: {product.price}</p>
            </div>

            <div className="flex gap-2">
              {/* تعديل */}
              <Button
                onClick={() => onEdit(product)}
                variant="outline"
              >
                تعديل
              </Button>

              {/* حذف */}
              <Button
                onClick={() => {
                  console.log('🔥 DELETE CLICK ID:', product.id)
                  onDelete(product.id)
                }}
                variant="destructive"
              >
                حذف
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}