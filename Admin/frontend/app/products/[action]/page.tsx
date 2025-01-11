"use client";
import React, { useState } from "react";
import { Typography, TextField, Button, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { Upload } from "lucide-react";
import { useFormStatus } from "react-dom";

interface ImageURL {
  imageUrl: string[];
}

function ImageUploadForm() {
  const { pending } = useFormStatus();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState<File[]>([]);
  const [imageURL, setImageURL] = useState<string[]>([]);

const [error, setError] = useState<string | null>(null);

async function doSubmit() {
  try {
    setError(null);
    const formData = new FormData();
    file.forEach((f) => formData.append("images", f));
    const response = await fetch("http://localhost:5000/admin/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to upload image.");
    const data: ImageURL = await response.json();
    setImageURL(data.imageUrl);
    console.log(imageURL)
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message || "Something went wrong.");
    } else {
      setError("Something went wrong.");
    }
  }
}

  return (
    <form onSubmit={handleSubmit(doSubmit)} className="w-full max-w-md">
      <div className="mb-4 bg-slate-300 rounded-lg">
        <label
          htmlFor="image"
          className="text-center text-xl cursor-pointer flex flex-col items-center justify-center gap-3 hover:bg-slate-300 p-6 rounded-md"
        >
          <Upload />
          Product Images
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            onChange={(e) => {
              if (e.target.files && e.target.files.length <= 4) {
                setFile(Array.from(e.target.files));
              } else {
                alert("You can only upload up to 4 files.");
              }
            }}
            className="w-full p-2 border border-gray-300 rounded-md hidden"
            multiple
            required
          />
        </label>
      </div>

      {errors.image && (
        <p className="text-red-500 text-sm">
          {typeof errors.image.message === "string" && errors.image.message}
        </p>
      )}

      {file.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Selected files: {file.map((f) => f.name).join(", ")}
          </p>
        </div>
      )}
      <Button
        variant="contained"
        type="submit"
        color="primary"
        disabled={pending}
        className="w-full "
      >
        {pending ? <CircularProgress size={24} /> : "Upload Image"}
      </Button>
    </form>
  );
}

const ProductForm = () => {
  const [imageURL, setImageURL] = useState<string[]>([]);
  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/admin/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data: ImageURL = await response.json();
      setImageURL(data.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };
  type IPart = {
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
    console.log(data);
  };

  return (
    <>
      <Paper className="p-6 max-w-md mx-auto mt-[5rem]">
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
              <TextField {...field} fullWidth label="Discount" type="number" />
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
            defaultValue={imageURL}
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
    </>
  );
};

export default function page() {
  return (
    <>
      <div className="flex flex-col items-center border-2 shadow-md justify-center gap-4 mt-[5rem] p-6 bg-gray-100">
        <Typography variant="h4" gutterBottom>
          Add Product
        </Typography>
        <ImageUploadForm />
      </div>
    </>
  );
}
