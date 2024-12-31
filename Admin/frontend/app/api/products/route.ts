import { NextResponse } from 'next/server'

let products = [
  { id: 1, name: 'Product 1', price: 19.99, stock: 100 },
  { id: 2, name: 'Product 2', price: 29.99, stock: 50 },
  { id: 3, name: 'Product 3', price: 39.99, stock: 75 },
]

export async function GET() {
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const newProduct = await request.json()
  newProduct.id = products.length + 1
  products.push(newProduct)
  return NextResponse.json(newProduct, { status: 201 })
}

