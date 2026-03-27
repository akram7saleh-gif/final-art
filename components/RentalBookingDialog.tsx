'use client'

import { useState, useEffect } from 'react'
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
  calculateRentalPrice,
  calculateDeliveryDate,
  formatDateAr,
  formatDateInput,
  getTodayInputDate,
  generateRentalMessage,
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

const pickupMethods = [
  { value: 'delivery', label: 'توصيل للعنوان' },
  { value: 'store', label: 'من المتجر' }
]

const paymentMethods = [
  { value: 'stc', label: 'محفظة جيب' },
  { value: 'zain', label: 'كريمي' },
  { value: 'mada', label: 'محفظة جوالي' },
  { value: 'visa', label: 'محفظة فلوسك' },
]

export default function RentalBookingDialog({ product, open, onOpenChange }: Props) {
  const [days, setDays] = useState<string>('1')
  const [startDate, setStartDate] = useState<string>(getTodayInputDate())
  const [pickupMethod, setPickupMethod] = useState<string>('delivery')
  const [paymentMethod, setPaymentMethod] = useState<string>('stc')
  const [notes, setNotes] = useState<string>('')
  const [totalPrice, setTotalPrice] = useState(product.price)

  // Recalculate price when days change
  useEffect(() => {
    const numDays = Math.max(1, parseInt(days) || 0)
    setTotalPrice(calculateRentalPrice(product.price, numDays))
  }, [days, product.price])

  const numDays = Math.max(1, parseInt(days) || 0)
  const deliveryDate = calculateDeliveryDate(new Date(startDate), numDays)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate || !days || !pickupMethod || !paymentMethod) {
      alert('الرجاء ملء جميع الحقول المطلوبة')
      return
    }

    const message = generateRentalMessage({
      productName: product.name,
      days: numDays,
      totalPrice,
      startDate: formatDateAr(new Date(startDate)),
      endDate: formatDateAr(deliveryDate),
      pickupMethod: pickupMethods.find(m => m.value === pickupMethod)?.label || pickupMethod,
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
          <DialogTitle>احجز {product.name}</DialogTitle>
          <DialogDescription>
            أكمل البيانات أدناه لإرسال الطلب عبر واتساب
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

          {/* Number of Days */}
          <div className="space-y-2">
            <Label htmlFor="days">عدد الأيام</Label>
            <Input
              id="days"
              type="number"
              min="1"
              max="365"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="أدخل عدد الأيام"
              required
            />
          </div>

          {/* Price Display */}
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">إجمالي السعر</p>
            <p className="text-3xl font-bold text-primary">
              {totalPrice.toLocaleString('ar-SA')} ريال
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {product.price} ريال × {numDays} {numDays === 1 ? 'يوم' : 'أيام'}
            </p>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="startDate">تاريخ الاستلام</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={getTodayInputDate()}
              required
            />
          </div>

          {/* End Date - Read Only */}
          <div className="space-y-2">
            <Label htmlFor="endDate">تاريخ التسليم</Label>
            <Input
              id="endDate"
              value={formatDateAr(deliveryDate)}
              disabled
              className="bg-muted"
            />
          </div>

          {/* Pickup Method */}
          <div className="space-y-2">
            <Label htmlFor="pickup">طريقة الاستلام</Label>
            <Select value={pickupMethod} onValueChange={setPickupMethod}>
              <SelectTrigger id="pickup">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pickupMethods.map((method) => (
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
            إرسال الطلب عبر واتساب
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
