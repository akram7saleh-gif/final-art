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
  generateSellMessage,
  openWhatsApp
} from '@/lib/utils-rental'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const productTypes = [
  { value: 'camera', label: 'كاميرا' },
  { value: 'lens', label: 'عدسة' },
  { value: 'equipment', label: 'معدات' },
  { value: 'accessory', label: 'إكسسوار' }
]

const conditions = [
  { value: 'new', label: 'جديد' },
  { value: 'used', label: 'مستخدم' }
]

const usagePeriods = [
  { value: 'less-month', label: 'أقل من شهر' },
  { value: '1-3-months', label: 'من شهر إلى 3 أشهر' },
  { value: '3-6-months', label: 'من 3 إلى 6 أشهر' },
  { value: '6-12-months', label: 'من 6 أشهر إلى سنة' },
  { value: 'over-year', label: 'أكثر من سنة' }
]

export default function SellProductDialog({ open, onOpenChange }: Props) {
  const [productType, setProductType] = useState<string>('camera')
  const [productName, setProductName] = useState<string>('')
  const [condition, setCondition] = useState<string>('used')
  const [usagePeriod, setUsagePeriod] = useState<string>('less-month')
  const [askingPrice, setAskingPrice] = useState<string>('')
  const [notes, setNotes] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!productName || !askingPrice) {
      alert('الرجاء ملء جميع الحقول المطلوبة')
      return
    }

    const price = parseInt(askingPrice) || 0
    if (price <= 0) {
      alert('الرجاء إدخال سعر صحيح')
      return
    }

    const message = generateSellMessage({
      productType: productTypes.find(t => t.value === productType)?.label || productType,
      productName,
      condition: conditions.find(c => c.value === condition)?.label || condition,
      usagePeriod: usagePeriods.find(p => p.value === usagePeriod)?.label || usagePeriod,
      askingPrice: price,
      notes
    })

    openWhatsApp(message)
    onOpenChange(false)
    
    // Reset form
    setProductName('')
    setAskingPrice('')
    setNotes('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>بيع منتج قديم</DialogTitle>
          <DialogDescription>
            أخبرنا عن المنتج الذي تريد بيعه وسنتواصل معك قريباً
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Type */}
          <div className="space-y-2">
            <Label htmlFor="type">نوع المنتج</Label>
            <Select value={productType} onValueChange={setProductType}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name">اسم المنتج</Label>
            <Input
              id="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="مثال: Canon EOS R5"
              required
            />
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <Label htmlFor="condition">حالة المنتج</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger id="condition">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((cond) => (
                  <SelectItem key={cond.value} value={cond.value}>
                    {cond.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Usage Period */}
          <div className="space-y-2">
            <Label htmlFor="usage">مدة الاستخدام</Label>
            <Select value={usagePeriod} onValueChange={setUsagePeriod}>
              <SelectTrigger id="usage">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {usagePeriods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Asking Price */}
          <div className="space-y-2">
            <Label htmlFor="price">السعر المطلوب (ريال)</Label>
            <Input
              id="price"
              type="number"
              min="1"
              value={askingPrice}
              onChange={(e) => setAskingPrice(e.target.value)}
              placeholder="أدخل السعر"
              required
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="حالة المنتج، أي عيوب، الملحقات المرفقة..."
            />
          </div>

          {/* Alert */}
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <p className="text-sm text-foreground">
              سيتم مراجعة طلبك وسنتواصل معك عبر واتساب لتأكيد السعر والشروط.
            </p>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            إرسال طلب البيع عبر واتساب
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
