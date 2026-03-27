'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-bg.jpg"
          alt="Professional cinema equipment"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay with opacity */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white text-balance leading-tight drop-shadow-lg">
            احترف فن التصوير معنا
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-100 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
            منصتك الموثوقة للحصول على أفضل معدات التصوير الاحترافية
          </p>
          
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            سواء كنت مصورًا محترفًا أو تطمح لدخول عالم التصوير السينمائي، نوفر لك أحدث الكاميرات والعدسات والمعدات بخدمة تأجير مرنة وشراء بأسعار تنافسية. احقق أحلامك الإبداعية معنا.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/rental">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-6 px-8 text-lg rounded-lg shadow-lg transition-all hover:shadow-xl"
            >
              ابدأ التأجير الآن
            </Button>
          </Link>
          <Link href="/equipment">
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold py-6 px-8 text-lg rounded-lg shadow-lg transition-all hover:shadow-xl"
            >
              استكشف المعدات
            </Button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="pt-8 animate-bounce">
          <svg className="w-6 h-6 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
