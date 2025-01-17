"use client";

import React, { useEffect ,useState} from "react";
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
import { useFetch } from "../hooks/useFetch";
import { useRouter } from "next/navigation";
import { CategoryData, Category } from '@/Types';
import Image from "next/image";

interface DeleteData {
  success: boolean;
  message: string;
}

export default function ProductList() {
  const router = useRouter();
  const[parentCategory, setParentCategory] = useState<Category | null>(null);
  const {
    data: categories,
    loading,
    error,
  } = useFetch<CategoryData>("http://localhost:5000/category/", "GET");
  
  const fetchParentCategory = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/category/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const categoryData: CategoryData = await response.json();
      if (!categoryData?.success) {
        <Alert severity="error">Failed to Fetch Parent Category</Alert>;
        throw new Error(`HTTP error! status: ${categoryData.success}`);
      }
      setParentCategory(categoryData.Category[0]);
    } catch (error) {
      alert(`Failed to fetch Parent Category. Please try again.${error}`);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/login");
    }
    
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/category/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const delelteData: DeleteData = await response.json();
      if (!delelteData?.success) {
        <Alert severity="error">Failed to Delete Category</Alert>;
        throw new Error(`HTTP error! status: ${delelteData?.message}`);
      }
      <Alert severity="success">Category Deleted Successfully</Alert>;
      setTimeout(() => {
        router.refresh();
      }, 1000);
      // Refresh the product list after successful deletion
    } catch (error) {
      alert(`Failed to delete Category. Please try again.${error}`);
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
          All Categories
        </Typography>
        <Link href="/Category/Add" passHref>
          <Button variant="contained" color="primary" startIcon={<Add />}>
            Add Categories
          </Button>
        </Link>
      </div>
      {categories?.Category && categories?.Category.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Category Image</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Parent Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                {/* <TableCell>Edit Brand details</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.Category.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.category_id}</TableCell>
                  <TableCell>
                    <Image
                      src={
                        product.category_image
                          ? `http://localhost:5000/${product.category_image}`
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
                  <TableCell>{product.parent_Category}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                 
                    <Link
                      href={`/Category/Edit/${product._id}`}
                      passHref
                      className="mr-2"
                    >
                      <Button size="small" variant="contained">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      startIcon={<Delete />}
                      size="small"
                      onClick={() => handleDelete(product._id)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
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
          }}
        >
          No Brands found.
        </Typography>
      )}
    </div>
  );
}
