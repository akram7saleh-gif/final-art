#!/usr/bin/env node

/**
 * Verify Supabase Connection
 * تحقق من اتصالك بـ Supabase
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
]

console.log('🔍 التحقق من متغيرات البيئة...\n')

let allPresent = true

requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar]
  if (value) {
    console.log(`✅ ${envVar}`)
  } else {
    console.log(`❌ ${envVar} - مفقود!`)
    allPresent = false
  }
})

if (allPresent) {
  console.log('\n✨ جميع متغيرات البيئة موجودة!')
  console.log('\n📝 الخطوة التالية:')
  console.log('1. انسخ محتوى ملف: scripts/001_create_products_table.sql')
  console.log('2. اذهب إلى Supabase Dashboard > SQL Editor')
  console.log('3. انشئ query جديدة والصق الكود')
  console.log('4. انقر Run')
  console.log('\nثم شغل: npm run dev')
} else {
  console.log('\n❌ بعض متغيرات البيئة مفقودة!')
  console.log('تأكد من إضافتها في project settings')
  process.exit(1)
}
