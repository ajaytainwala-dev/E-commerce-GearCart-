"use client";

import React, { useEffect } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { Context } from "../ContextAPI/AppContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function ProductList() {
  const router = useRouter();
  const { fetchAllProducts, products, deleteProduct } = useContext(Context);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Login");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    fetchAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(products?.products);
  const handleDelete = async (id: number) => {
    try {
      const { success, message } = await deleteProduct(id);

      if (!success) {
        <Alert severity="error">{message}</Alert>;
      } else {
        <Alert severity="success">Product Deleted Successfully</Alert>;
        fetchAllProducts();
      }

      // Refresh the product list after successful deletion
    } catch (error) {
      console.error("Failed to delete product:", error);
      <Alert severity="error">Failed to Delete Product</Alert>;
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-[100vh] flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div
          style={{
            padding: "20px",
            marginTop: "5rem",
          }}
        >
          <div
            className="flex justify-between items-center mb-4"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5rem",
            }}
          >
            <Typography variant="h4" gutterBottom>
              All Products
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
                    <TableCell>Product Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                    <TableCell>More Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>
                        <Image
                          src={
                            product.imageUrl
                              ? `http://localhost:5000/${product.imageUrl}`
                              : "/DummyPlaceholder.webp"
                          }
                          alt={product.name}
                          width={50}
                          height={50}
                        />
                      </TableCell>

                      <TableCell>{product.name}</TableCell>
                      <TableCell>₹{product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Button
                          startIcon={<Delete />}
                          size="small"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/products/ViewProduct/${product._id}`}
                          passHref
                        >
                          <Button size="small" variant="contained">
                            View More
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "1.5rem",
                color: "gray",
                marginTop: "5rem",
                minHeight: "100vh",
              }}
            >
              No products found.
            </Typography>
          )}
        </div>
      )}
    </>
  );
}
