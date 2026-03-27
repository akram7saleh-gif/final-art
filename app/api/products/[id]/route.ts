import { updateProduct, deleteProduct } from '@/lib/supabase/products'
import { isAdminAuthenticated } from '@/lib/auth'

export async function PUT(request: Request) {
  const isAuthenticated = await isAdminAuthenticated()
  if (!isAuthenticated) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    // ✅ الحل هنا (مثل الحذف)
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    console.log('PUT ID:', id)

    if (!id) {
      return Response.json(
        { error: 'Missing product ID' },
        { status: 400 }
      )
    }

    const {
      name,
      description,
      type,
      location,
      price,
      image,
    } = body

    const fixedPrice = price ? Number(price) : 0

    const product = await updateProduct(id, {
      name,
      description: description || null,
      type,
      location,
      price: fixedPrice,
      image: image || null,
    })

    if (!product) {
      return Response.json(
        { error: 'Failed to update product' },
        { status: 500 }
      )
    }

    return Response.json(product)
  } catch (error) {
    console.error('PUT ERROR:', error)
    return Response.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const isAuthenticated = await isAdminAuthenticated()
  if (!isAuthenticated) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    console.log('DELETE ID:', id)

    if (!id) {
      return Response.json(
        { error: 'Missing product ID' },
        { status: 400 }
      )
    }

    const success = await deleteProduct(id)

    if (!success) {
      return Response.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      )
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('DELETE ERROR:', error)
    return Response.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}