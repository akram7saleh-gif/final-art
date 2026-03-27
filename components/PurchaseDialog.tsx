'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  generatePurchaseMessage,
  openWhatsApp
} from '@/lib/utils-rental'

interface Product {
  id: number
  name: string
  price: number
}

interface Props {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

const deliveryMethods = [
  { value: 'delivery', label: 'توصيل للعنوان' },
  { value: 'pickup', label: 'استلام من المتجر' }
]

const paymentMethods = [
  { value: 'stc', label: 'محفظة STC' },
  { value: 'zain', label: 'محفظة زين' },
  { value: 'mada', label: 'بطاقة مدى' },
  { value: 'visa', label: 'بطاقة Visa' },
  { value: 'cash', label: 'دفع عند التسليم' }
]

export default function PurchaseDialog({ product, open, onOpenChange }: Props) {
  const [deliveryMethod, setDeliveryMethod] = useState<string>('delivery')
  const [paymentMethod, setPaymentMethod] = useState<string>('stc')
  const [notes, setNotes] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!deliveryMethod || !paymentMethod) {
      alert('الرجاء ملء جميع الحقول المطلوبة')
      return
    }

    const message = generatePurchaseMessage({
      productName: product.name,
      totalPrice: product.price,
      deliveryMethod: deliveryMethods.find(m => m.value === deliveryMethod)?.label || deliveryMethod,
      paymentMethod: paymentMethods.find(m => m.value === paymentMethod)?.label || paymentMethod,
      notes
    })

    openWhatsApp(message)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>شراء {product.name}</DialogTitle>
          <DialogDescription>
            أكمل البيانات أدناه لإرسال طلب الشراء عبر واتساب
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name - Read Only */}
          <div className="space-y-2">
            <Label htmlFor="product">اسم المنتج</Label>
            <Input
              id="product"
              value={product.name}
              disabled
              className="bg-muted"
            />
          </div>

          {/* Price Display */}
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">السعر</p>
            <p className="text-3xl font-bold text-primary">
              {product.price.toLocaleString('ar-SA')} ريال
            </p>
          </div>

          {/* Delivery Method */}
          <div className="space-y-2">
            <Label htmlFor="delivery">طريقة التسليم</Label>
            <Select value={deliveryMethod} onValueChange={setDeliveryMethod}>
              <SelectTrigger id="delivery">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {deliveryMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="payment">طريقة الدفع</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="payment">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أضف أي ملاحظات..."
            />
          </div>

          {/* Alert */}
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <p className="text-sm text-foreground">
              سيتم تأكيد الطلب عبر واتساب. سيتواصل معك الفريق قريباً.
            </p>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            إرسال طلب الشراء عبر واتساب
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
