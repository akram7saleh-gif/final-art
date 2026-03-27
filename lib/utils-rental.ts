/**
 * Calculate rental price based on daily rate and number of days
 */
export function calculateRentalPrice(dailyRate: number, days: number): number {
  return dailyRate * days
}

/**
 * Calculate delivery date based on start date and number of days
 */
export function calculateDeliveryDate(startDate: Date, days: number): Date {
  const deliveryDate = new Date(startDate)
  deliveryDate.setDate(deliveryDate.getDate() + days)
  return deliveryDate
}

/**
 * Format date for display (Arabic format)
 */
export function formatDateAr(date: Date): string {
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Format date for input (YYYY-MM-DD)
 */
export function formatDateInput(date: Date): string {
  return date.toISOString().split('T')[0]
}

/**
 * Parse input date string to Date object
 */
export function parseInputDate(dateString: string): Date {
  return new Date(dateString)
}

/**
 * Get today's date as formatted input string
 */
export function getTodayInputDate(): string {
  return formatDateInput(new Date())
}

/**
 * Generate WhatsApp rental request message
 */
export function generateRentalMessage(rental: {
  productName: string
  days: number
  totalPrice: number
  startDate: string
  endDate: string
  pickupMethod: string
  paymentMethod: string
  notes?: string
}): string {
  return `طلب تأجير منتج\n\n` +
    `اسم المنتج: ${rental.productName}\n` +
    `عدد الأيام: ${rental.days}\n` +
    `السعر: ${rental.totalPrice} ريال\n\n` +
    `تاريخ الاستلام: ${rental.startDate}\n` +
    `تاريخ التسليم: ${rental.endDate}\n\n` +
    `طريقة الاستلام: ${rental.pickupMethod}\n` +
    `المحفظة: ${rental.paymentMethod}\n` +
    (rental.notes ? `ملاحظات: ${rental.notes}\n` : '')
}

/**
 * Generate WhatsApp purchase message
 */
export function generatePurchaseMessage(purchase: {
  productName: string
  totalPrice: number
  deliveryMethod: string
  paymentMethod: string
  notes?: string
}): string {
  return `طلب شراء منتج\n\n` +
    `اسم المنتج: ${purchase.productName}\n` +
    `السعر: ${purchase.totalPrice} ريال\n\n` +
    `طريقة التسليم: ${purchase.deliveryMethod}\n` +
    `المحفظة: ${purchase.paymentMethod}\n` +
    (purchase.notes ? `ملاحظات: ${purchase.notes}\n` : '')
}

/**
 * Generate WhatsApp sell product message
 */
export function generateSellMessage(sell: {
  productType: string
  productName: string
  condition: string
  usagePeriod: string
  askingPrice: number
  notes?: string
}): string {
  return `طلب بيع منتج\n\n` +
    `نوع المنتج: ${sell.productType}\n` +
    `اسم المنتج: ${sell.productName}\n` +
    `الحالة: ${sell.condition}\n` +
    `مدة الاستخدام: ${sell.usagePeriod}\n` +
    `السعر المطلوب: ${sell.askingPrice} ريال\n` +
    (sell.notes ? `ملاحظات: ${sell.notes}\n` : '')
}

/**
 * Open WhatsApp with pre-filled message
 */
export function openWhatsApp(message: string, phoneNumber: string = '966123456789'): void {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(whatsappUrl, '_blank')
}
