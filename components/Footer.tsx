import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">عن Final Art</h3>
            <p className="text-sm opacity-90">
              متخصصون في بيع وشراء وتأجير معدات التصوير الاحترافية منذ سنوات.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">الروابط السريعة</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="opacity-90 hover:opacity-100 transition">الرئيسية</a></li>
              <li><a href="/rental" className="opacity-90 hover:opacity-100 transition">التأجير</a></li>
              <li><a href="/purchase" className="opacity-90 hover:opacity-100 transition">الشراء</a></li>
              <li><a href="/equipment" className="opacity-90 hover:opacity-100 transition">المعدات</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-sm">
              <li>الهاتف: <a href="tel:+967780090070" className="opacity-90 hover:opacity-100 transition">+967 780090070</a></li>
              <li><a href="https://wa.me/967780090070" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm">
          <p>
            &copy; {currentYear} Final Art. {' '}
            <Link 
              href="/admin/login" 
              className="opacity-75 hover:opacity-100 transition cursor-pointer font-medium"
            >
              جميع الحقوق محفوظة
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
