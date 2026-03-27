# Supabase Setup Guide

تم تحويل المشروع من SQLite إلى Supabase (PostgreSQL). اتبع الخطوات التالية للبدء:

## 1. التحقق من الاتصال بـ Supabase

جميع متغيرات البيئة تم إعدادها بالفعل:
- `NEXT_PUBLIC_SUPABASE_URL` - رابط Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - مفتاح العميل
- `SUPABASE_SERVICE_ROLE_KEY` - مفتاح الخادم

## 2. إنشاء الجداول

اتبع أحد الطرق التالية:

### الطريقة A: استخدام Supabase Dashboard (الأسهل)

1. اذهب إلى [Supabase Dashboard](https://app.supabase.com)
2. افتح مشروعك
3. انقر على "SQL Editor" في الشريط الجانبي
4. انقر على "New Query"
5. انسخ محتوى ملف `scripts/001_create_products_table.sql`
6. ألصقه في محرر SQL
7. انقر على "Run"

### الطريقة B: استخدام Supabase CLI

إذا كان لديك Supabase CLI مثبتة:

```bash
# تسجيل الدخول
supabase login

# تشغيل migrations
supabase db push
```

## 3. الملفات الجديدة

تم إنشاء الملفات التالية:

```
lib/supabase/
  ├── client.ts          # عميل Supabase للعملاء
  ├── server.ts          # عميل Supabase للخادم
  └── products.ts        # دوال للعمل مع المنتجات

app/api/
  └── products/
      ├── route.ts       # GET و POST للمنتجات
      └── [id]/route.ts  # PUT و DELETE للمنتج الواحد

scripts/
  └── 001_create_products_table.sql  # ملف إنشاء الجداول
```

## 4. هيكل الجداول

### جدول products
```
- id: UUID (مفتاح أساسي)
- name: TEXT (اسم المنتج)
- description: TEXT (وصف المنتج)
- type: TEXT (sale أو rent)
- location: TEXT (sale أو rent أو equipment)
- price: REAL (السعر)
- image: TEXT (رابط الصورة بصيغة base64 أو URL)
- created_at: TIMESTAMP (تاريخ الإنشاء)
```

### جدول orders
```
- id: UUID (مفتاح أساسي)
- product_id: UUID (معرف المنتج)
- order_type: TEXT (rental أو purchase)
- quantity: INTEGER (الكمية)
- start_date: TEXT (تاريخ البدء)
- end_date: TEXT (تاريخ الانتهاء)
- total_price: REAL (الإجمالي)
- customer_phone: TEXT (هاتف العميل)
- customer_name: TEXT (اسم العميل)
- notes: TEXT (ملاحظات)
- status: TEXT (pending أو confirmed أو completed أو cancelled)
- created_at: TIMESTAMP (تاريخ الإنشاء)
```

## 5. الأمان (RLS - Row Level Security)

تم تفعيل RLS على الجداول:

- **products**: يمكن للجميع قراءة المنتجات، فقط المسؤولون يمكنهم التعديل
- **orders**: يمكن للجميع إضافة طلبات وقراءتها

## 6. المميزات

✅ قاعدة بيانات حقيقية مستضافة على السحابة
✅ آمنة مع RLS
✅ سريعة ومعضة
✅ تتوافق تماماً مع Google Cloud
✅ نسخ احتياطية تلقائية
✅ SSL مفعل افتراضياً

## 7. البدء

بعد إنشاء الجداول:

```bash
npm run dev
```

ثم اذهب إلى:
- صفحة البيع: http://localhost:3000/purchase
- صفحة الإيجار: http://localhost:3000/rental
- لوحة التحكم: http://localhost:3000/admin/dashboard

## 8. استكشاف الأخطاء

إذا واجهت مشاكل:

1. تأكد من تشغيل SQL في Supabase Dashboard
2. تحقق من متغيرات البيئة في Project Settings
3. اطلع على السجلات: `$ supabase logs tail`

## 9. المرجعية

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
