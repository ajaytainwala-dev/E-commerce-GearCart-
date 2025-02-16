"use client";

import React from "react";
import {
  Typography,
  Paper,
  Button,
  CircularProgress,
  MenuItem,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";
import { TextField } from "@mui/material";
import { ProductData } from "../../Types";

interface OfferFormData {
  productId: string;
  discountPercentage: string;
}

export default function OfferPage() {
  const { data: products, loading } = useFetch<ProductData>(
    "http://localhost:5000/product/allproducts",
    "GET"
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OfferFormData>({
    defaultValues: {
      productId: "",
      discountPercentage: "",
    },
  });
  // console.log(products)
  const onSubmit = async (data: OfferFormData) => {
    console.log("Offer data:", data);
    try {
      const response = await fetch(
        `http://localhost:5000/admin/offer/${data.productId}/${data.discountPercentage}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          // body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Offer created:", result);
      alert("Offer created successfully!");
    } catch (error) {
      console.error("Failed to create offer:", error);
      alert("Failed to create offer. Please try again.");
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Create New Offer
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            {products?.products.length === 0 ? (
              <Typography variant="body2" color="error">
                No products available. Please add products first.
              </Typography>
            ) : (
              <Controller
                name="productId"
                control={control}
                rules={{ required: "Product is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label="Product"
                    error={!!errors.productId}
                    helperText={errors.productId?.message}
                    // defaultValue={}
                  >
                    {/* <MenuItem value={""}>No Products Available</MenuItem> */}
                    {loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      Array.isArray(products?.products) &&
                      products.products.map((product) => (
                        <MenuItem
                          key={product._id}
                          value={product._id.toString()}
                        >
                          {product.name}
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                )}
              />
            )}
          </Box>
            
          <Box mb={2}>
            <Controller
              name="discountPercentage"
              control={control}
              rules={{
                required: "Discount percentage is required",
                min: { value: 0, message: "Discount must be at least 0%" },
                max: { value: 100, message: "Discount cannot exceed 100%" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Discount Percentage"
                  type="number"
                  error={!!errors.discountPercentage}
                  helperText={errors.discountPercentage?.message}
                />
              )}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              Create Offer
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
