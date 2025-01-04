"use client";
import React from "react";
import { Typography, TextField, Button, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

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
 };
export default function Add(){
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<IPart>();
    
      const onSubmit = async (data: IPart) => {
        console.log(data);
      };
    return (
      <>
        <Paper
          className="p-6 max-w-md mx-auto mt-10 shadow-lg rounded-lg"
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{mt:"5rem", textAlign:"center"}}>
            Add New Product
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            style={{
              margin: "auto",
              width: "500px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
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
            {/* <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Image URL" />
              )}
            /> */}
            <input
              accept="image/*"
              className="hidden"
              id="raised-button-file"
              multiple
            type="file"
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
            <Controller
              name="supplierName"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Supplier Name" />
              )}
            />
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
          </form>
        </Paper>
      </>
    );
}