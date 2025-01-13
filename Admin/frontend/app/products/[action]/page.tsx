"use client";
import React from "react";
import { Typography, TextField, Button, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {useRouter} from "next/navigation";


interface IPart {
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
}


export default function Page() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPart>();
  const onSubmit = async (data: IPart) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:5000/admin/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      })
      const result = await response.json();
      setTimeout(()=>{
        router.push(`/products/upload/${result.id}`)
      },1000)
    } catch (error) {
      console.error(error);
      
    }
  };
  return (
    <>
      <div className="flex flex-col items-center border-2 shadow-md justify-center gap-4 mt-[5rem] p-6 bg-gray-100">
        <Typography variant="h4" gutterBottom>
          Add Product
        </Typography>

        <Paper className="p-6 max-w-md mx-auto mt-[1rem]">
          <Typography variant="h4" gutterBottom>
            Add New Product
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
                <TextField
                  {...field}
                  fullWidth
                  label="Discount"
                  type="number"
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
              name="supplierName"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Supplier Name" />
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
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
}
