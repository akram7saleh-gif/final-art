'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // إرسال الرسالة عبر WhatsApp
    const message = `*طلب اتصال من Final Art*\n\n📝 الاسم: ${formData.name}\n📧 البريد: ${formData.email}\n📞 الهاتف: ${formData.phone}\n\n📌 الموضوع: ${formData.subject}\n\n💬 الرسالة:\n${formData.message}`
    const whatsappLink = `https://wa.me/967780090070?text=${encodeURIComponent(message)}`
    window.open(whatsappLink, '_blank')
    
    setSubmitted(true)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* العنوان */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">تواصل معنا</h1>
          <p className="text-lg text-muted-foreground">نحن هنا للإجابة على جميع استفساراتك</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* بيانات الاتصال */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-primary mb-6">معلومات التواصل</h2>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">الهاتف</h3>
                <p className="text-muted-foreground">967780090070</p>
                <p className="text-muted-foreground">967780090070</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">العنوان</h3>
                <p className="text-muted-foreground">اليمن - الحديده</p>
                <p className="text-muted-foreground">شارع جمال</p>
              </div>
            </div>

            {/* أوقات العمل */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">أوقات العمل</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>على مدار الاسبوع </span>
                  <span>8:00 صباحاً - 10:00 مساءً</span>
                </div>
                <div className="flex justify-between">
                  <span>الجمعة</span>
                  <span>2:00 مساءً - 10:00 مساءً</span>
                </div>
              </div>
            </div>
          </div>

          {/* نموذج الاتصال */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">أرسل لنا رسالة</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">الاسم</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أدخل اسمك الكامل"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">البريد الإلكتروني</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">رقم الهاتف</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="أدخل رقم هاتفك"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">الموضوع</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="موضوع الرسالة"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">الرسالة</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="أكتب رسالتك هنا..."
                  required
                  rows={5}
                  className="w-full"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                إرسال عبر WhatsApp
              </Button>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-center">
                  تم إرسال رسالتك بنجاح! سيتم التواصل معك قريباً
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
