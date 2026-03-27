-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('sale', 'rent')),
  location TEXT NOT NULL CHECK (location IN ('sale', 'rent', 'equipment')),
  price REAL NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  order_type TEXT NOT NULL CHECK (order_type IN ('rental', 'purchase')),
  quantity INTEGER DEFAULT 1,
  start_date TEXT,
  end_date TEXT,
  total_price REAL NOT NULL,
  customer_phone TEXT,
  customer_name TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public to view products" ON public.products
  FOR SELECT
  USING (true);

-- Create admin check function (for checking admin status)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.jwt() ->> 'is_admin')::boolean = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Allow admins to insert products
CREATE POLICY "Allow admins to insert products" ON public.products
  FOR INSERT
  WITH CHECK (is_admin());

-- Allow admins to update products
CREATE POLICY "Allow admins to update products" ON public.products
  FOR UPDATE
  USING (is_admin());

-- Allow admins to delete products
CREATE POLICY "Allow admins to delete products" ON public.products
  FOR DELETE
  USING (is_admin());

-- Enable RLS for orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public to insert orders
CREATE POLICY "Allow public to insert orders" ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Allow public to view orders (all orders)
CREATE POLICY "Allow public to view orders" ON public.orders
  FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_type ON public.products(type);
CREATE INDEX IF NOT EXISTS idx_products_location ON public.products(location);
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON public.orders(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
