"use client";

import React, { useState } from "react";
import { Typography, TextField, Button, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";



export default function ProductForm() {
  type  IPart = {
    id: number;
    OEMPartNumber: string;
    partNumber: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    discount: number;
    stock: number;
    description: string;
    vehicleType: string;
    compatibility: string[];
    imageUrl: string[];
    supplierName: string;
  };



  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPart>();

  const onSubmit = async (data: IPart) => {
  
  };

  return (
    <Paper className="p-6 max-w-md mx-auto">
      <Typography variant="h4" gutterBottom>
        {isEditing ? "Edit Product" : "Add New Product"}
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: "Product name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Product Name"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          rules={{ required: "Price is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Price"
              type="number"
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : ""}
            />
          )}
        />
        <Controller
          name="stock"
          control={control}
          rules={{ required: "Stock is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Stock"
              type="number"
              error={!!errors.stock}
              helperText={errors.stock ? errors.stock.message : ""}
            />
          )}
        />
        <Controller
          name="OEMPartNumber"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="OEM Part Number" />
          )}
        />
        <Controller
          name="partNumber"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Part Number" />
          )}
        />
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Brand" />
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Category" />
          )}
        />
        <Controller
          name="discount"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Discount" type="number" />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Description"
              multiline
              rows={4}
            />
          )}
        />
        <Controller
          name="vehicleType"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Vehicle Type" />
          )}
        />
        <Controller
          name="compatibility"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Compatibility" />
          )}
        />
        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Image URL" />
          )}
        />
        <Controller
          name="supplierName"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Supplier Name" />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? "Update Product" : "Add Product"}
        </Button>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>
      </form>
    </Paper>
  );
}
