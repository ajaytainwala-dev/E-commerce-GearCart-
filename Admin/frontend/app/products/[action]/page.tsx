'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Typography, TextField, Button, Paper, CircularProgress } from '@mui/material'
import { useFetch } from '../../hooks/useFetch'

interface ProductFormData {
  name: string
  price: string
  stock: string
}

export default function ProductForm() {
  const router = useRouter()
  const { action, id } = useParams()
  const isEditing = action === 'edit'

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    stock: '',
  })

  const { data: product, loading, error } = useFetch<ProductFormData>(
    isEditing ? `/api/products/${id}` : null
  )

  useEffect(() => {
    if (isEditing && product) {
      setFormData(product)
    }
  }, [isEditing, product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = isEditing ? `/api/products/${id}` : '/api/products'
      const method = isEditing ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      router.push('/products')
    } catch (error) {
      console.error('Failed to submit form:', error)
      alert('Failed to submit form. Please try again.')
    }
  }

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>
  }

  return (
    <Paper className="p-6 max-w-md mx-auto">
      <Typography variant="h4" gutterBottom>
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? 'Update Product' : 'Add Product'}
        </Button>
      </form>
    </Paper>
  )
}

