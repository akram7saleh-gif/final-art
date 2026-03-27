'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Product {
  id?: number
  name: string
  description: string
  type: 'sale' | 'rent'
  location: 'sale' | 'rent' | 'equipment'
  price: number
  image: string
}

interface AdminProductFormProps {
  product?: Product | null
  onSubmit: (data: Product) => void
  onCancel: () => void
}

export default function AdminProductForm({ product, onSubmit, onCancel }: AdminProductFormProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      name: '',
      description: '',
      type: 'sale',
      location: 'sale',
      price: 0,
      image: '',
    }
  )

  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>(product?.image || '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'price') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value as any,
      }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData(prev => ({
          ...prev,
          image: result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">
            اسم المنتج
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="مثال: كاميرا كانون EOS R5"
            required
            className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          />
        </div>

        {/* Product Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            نوع المنتج
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          >
            <option value="sale">بيع</option>
            <option value="rent">إيجار</option>
          </select>
        </div>

        {/* Product Location */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            مكان العرض
          </label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          >
            <option value="sale">صفحة البيع</option>
            <option value="rent">صفحة الإيجار</option>
            <option value="equipment">صفحة المعدات</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            السعر (ر.س)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
            className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          الوصف
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          placeholder="وصف تفصيلي للمنتج"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          صورة المنتج
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        />
        {imagePreview && (
          <div className="mt-3 relative w-32 h-32">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          إلغاء
        </Button>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? 'جاري الحفظ...' : product ? 'تحديث المنتج' : 'إضافة المنتج'}
        </Button>
      </div>
    </form>
  )
}
