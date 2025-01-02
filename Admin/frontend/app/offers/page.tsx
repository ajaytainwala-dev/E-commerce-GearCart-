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
import  {useFetch } from "../hooks/useFetch";
import { TextField } from "@mui/material";

interface Product {
    id: number;
    name: string;
}
const products = [
  { id: 1, name: "Product 1", price: 19.99, stock: 100 },
  { id: 2, name: "Product 2", price: 29.99, stock: 50 },
  { id: 3, name: "Product 3", price: 39.99, stock: 75 },
];
interface OfferFormData {
    productId: string;
    discountPercentage: string;
}

export default function OfferPage() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<OfferFormData>();
    

    const onSubmit = async (data: OfferFormData) => {
        try {
            
            const response = await fetch("http://localhost:6000/admin/offer", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });

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
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
                <Typography variant="h4" gutterBottom>
                    Create New Offer
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box mb={2}>
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
                                >
                                    {products?.map((product) => (
                                        <MenuItem key={product.id} value={product.id.toString()}>
                                            {product.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
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
