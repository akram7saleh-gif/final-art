import { getAllProducts, createProduct } from '@/lib/supabase/products'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const products = await getAllProducts()
    return Response.json(products)
  } catch (error) {
    console.error('[v0] GET /api/products error:', error)
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const isAuthenticated = await isAdminAuthenticated()
  if (!isAuthenticated) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      name,
      description,
      type,
      location,
      price,
      image,
    } = body

    // Validate required fields
    if (!name || !type || !location || price === undefined) {
      return Response.json(
        { error: 'Missing required fields: name, type, location, price' },
        { status: 400 }
      )
    }

    // Validate type and location values
    if (!['sale', 'rent'].includes(type)) {
      return Response.json(
        { error: 'Invalid type. Must be "sale" or "rent"' },
        { status: 400 }
      )
    }

    if (!['sale', 'rent', 'equipment'].includes(location)) {
      return Response.json(
        { error: 'Invalid location. Must be "sale", "rent", or "equipment"' },
        { status: 400 }
      )
    }

    const product = await createProduct({
      name,
      description: description || null,
      type,
      location,
      price: parseFloat(price),
      image: image || null,
    })

    if (!product) {
      return Response.json(
        { error: 'Failed to create product' },
        { status: 500 }
      )
    }

    return Response.json(product, { status: 201 })
  } catch (error) {
    console.error('[v0] POST /api/products error:', error)
    return Response.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
