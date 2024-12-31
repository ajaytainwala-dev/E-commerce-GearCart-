import { NextResponse } from 'next/server'

let products = [
  { id: 1, name: 'Product 1', price: 19.99, stock: 100 },
  { id: 2, name: 'Product 2', price: 29.99, stock: 50 },
  { id: 3, name: 'Product 3', price: 39.99, stock: 75 },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const product = products.find(p => p.id === id)
  if (product) {
    return NextResponse.json(product)
  } else {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const updatedProduct = await request.json()
  const index = products.findIndex(p => p.id === id)
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct }
    return NextResponse.json(products[index])
  } else {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const index = products.findIndex(p => p.id === id)
  if (index !== -1) {
    products.splice(index, 1)
    return NextResponse.json({ message: 'Product deleted successfully' })
  } else {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
}

