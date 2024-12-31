'use client'

import React from 'react'
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import Link from 'next/link'
import { useFetch } from '../hooks/useFetch'

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

export default function ProductList() {
  const { data: products, loading, error } = useFetch<Product[]>('/api/products')

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      // Refresh the product list after successful deletion
      window.location.reload()
    } catch (error) {
      console.error('Failed to delete product:', error)
      alert('Failed to delete product. Please try again.')
    }
  }

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
        <Link href="/products/add" passHref>
          <Button variant="contained" color="primary" startIcon={<Add />}>
            Add Product
          </Button>
        </Link>
      </div>
      {products && products.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Link href={`/products/edit/${product.id}`} passHref>
                      <Button startIcon={<Edit />} size="small">
                        Edit
                      </Button>
                    </Link>
                    <Button startIcon={<Delete />} size="small" onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No products found.</Typography>
      )}
    </div>
  )
}

