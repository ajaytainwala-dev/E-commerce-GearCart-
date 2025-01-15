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
import { Add,  Delete } from "@mui/icons-material";
import Link from "next/link";
import { useFetch } from "../hooks/useFetch";
import { useRouter } from "next/navigation";
import { BrandData } from "@/Types";
import Image from "next/image";


interface DeleteData {
  success: boolean;
  message: string;
}

export default function ProductList() {
  const router = useRouter();
  const {
    data: brands,
    loading,
    error,
  } = useFetch<BrandData>("http://localhost:5000/brand/", "GET");

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  // console.log(products?.products);
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/brand/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const delelteData: DeleteData = await response.json();
      if (!delelteData?.success) {
        <Alert severity="error">Failed to Delete Product</Alert>;
        throw new Error(`HTTP error! status: ${delelteData?.message}`);
      }
      <Alert severity="success">Product Deleted Successfully</Alert>;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // Refresh the product list after successful deletion
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
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
          All Brands
        </Typography>
        <Link href="/Brands/add" passHref>
          <Button variant="contained" color="primary" startIcon={<Add />}>
            Add Brand
          </Button>
        </Link>
      </div>
      {brands?.brands && brands?.brands.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Brand Logo</TableCell>
                <TableCell>Brand Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Country of Origin</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                {/* <TableCell>More Details</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {brands?.brands.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.brand_id}</TableCell>
                  <TableCell>
                    <Image
                      src={
                        product.logo_url
                          ? `http://localhost:5000/${product.logo_url}`
                          : "/DummyPlaceholder.webp"
                      }
                      alt={product.name}
                      width={50}
                      height={50}
                      // layout="fixed"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.country_of_origin}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {/* <Link href={`/products/edit/${product.id}`} passHref>
                      <Button startIcon={<Edit />} size="small">
                        Edit
                      </Button>
                    </Link> */}
                    <Button
                      startIcon={<Delete />}
                      size="small"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  {/* <TableCell>
                    <Link href={`/products/ViewProduct/${product._id}`} passHref>
                      <Button size="small" variant="contained">View More</Button>
                    </Link>
                    </TableCell> */}
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
          }}
        >
          No Brands found.
        </Typography>
      )}
    </div>
  );
}
