import { createClient } from '@/lib/supabase/server'

export interface Product {
  id: string
  name: string
  description: string | null
  type: 'sale' | 'rent'
  location: 'sale' | 'rent' | 'equipment'
  price: number
  image: string | null
  created_at: string
}

export interface Order {
  id: string
  product_id: string
  order_type: 'rental' | 'purchase'
  quantity: number
  start_date: string | null
  end_date: string | null
  total_price: number
  customer_phone: string | null
  customer_name: string | null
  notes: string | null
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[v0] Error fetching products:', error)
    return []
  }

  return data || []
}

export async function getProductsByLocation(location: 'sale' | 'rent' | 'equipment'): Promise<Product[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('location', location)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[v0] Error fetching products by location:', error)
    return []
  }

  return data || []
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('[v0] Error fetching product:', error)
    return null
  }

  return data
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single()

  if (error) {
    console.error('[v0] Error creating product:', error)
    return null
  }

  return data
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, 'id' | 'created_at'>>
): Promise<Product | null> {
  const supabase = await createClient()

  // 🔥 تنظيف البيانات قبل الإرسال
  const cleanData = {
    ...updates,
    price: updates.price ? Number(updates.price) : 0,
  }

  const { data, error } = await supabase
    .from('products')
    .update(cleanData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('🔥 Supabase update error:', error)
    return null
  }

  return data
}

export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('[v0] Error deleting product:', error)
    return false
  }

  return true
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at'>): Promise<Order | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single()

  if (error) {
    console.error('[v0] Error creating order:', error)
    return null
  }

  return data
}

export async function getOrdersByProductId(productId: string): Promise<Order[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[v0] Error fetching orders:', error)
    return []
  }

  return data || []
}

export async function getAllOrders(): Promise<Order[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[v0] Error fetching all orders:', error)
    return []
  }

  return data || []
}
