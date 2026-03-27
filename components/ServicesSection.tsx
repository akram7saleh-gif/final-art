'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const services = [
  {
    icon: '🎬',
    title: 'تأجير الكاميرات',
    description: 'استأجر أفضل الكاميرات الاحترافية بأسعار اقتصادية لمشاريعك',
    href: '/rental'
  },
  {
    icon: '🎥',
    title: 'بيع المعدات',
    description: 'شراء معدات التصوير الأصلية من أفضل الماركات العالمية',
    href: '/purchase'
  },
  {
    icon: '📸',
    title: 'الملحقات والإكسسوارات',
    description: 'جميع الملحقات اللازمة لإكمال مشروعك التصويري',
    href: '/equipment'
  }
]

export default function ServicesSection() {
  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            خدماتنا
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات لتلبية احتياجات المصورين والمحترفين
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link key={index} href={service.href}>
              <Card className="h-full hover:shadow-lg hover:border-primary transition-all cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
