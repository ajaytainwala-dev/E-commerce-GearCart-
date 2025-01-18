"use client";
import React from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Category, CategoryData } from "@/Types";

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
interface Brand {
  _id: number;
  brand_id: string;
  name: string;
  description: string;
  country_of_origin: string;
  logo_url: string;
}

interface BrandData {
  success: boolean;
  brands: Brand[];
}

export default function Page() {
  const router = useRouter();
  const [brand, setBrand] = React.useState<Brand[]>([]);
  const [category, setCategory] = React.useState<Category[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPart>();

  const fetchBrand = async () => {
    try {
      const response = await fetch("http://localhost:5000/brand", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result: BrandData = await response.json();
      setBrand(result.brands || []);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await fetch("http://localhost:5000/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result: CategoryData = await response.json();
      setCategory(result.Category || []);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    fetchBrand();
    fetchCategory();
  }, []);
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
      });
      const result = await response.json();
      setTimeout(() => {
        router.push(`/products/upload/${result.id}`);
      }, 1000);
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
                  required
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
                  required
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
                  required
                  error={!!errors.stock}
                  helperText={errors.stock ? errors.stock.message : ""}
                />
              )}
            />
            <Controller
              name="OEMPartNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="OEM Part Number"
                />
              )}
            />
            <Controller
              name="partNumber"
              control={control}
              render={({ field }) => (
                <TextField {...field} required fullWidth label="Part Number" />
              )}
            />
            {/* <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <TextField {...field} required fullWidth label="Brand" />
              )}
            /> */}
            <InputLabel id="demo-simple-select-label">Brands</InputLabel>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <MenuItem value={0}>None</MenuItem>
                  {brand &&
                    brand.map((cat) => (
                      <MenuItem key={cat.brand_id} value={String(cat._id)}>
                        {cat.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <MenuItem value={0}>None</MenuItem>
                  {category &&
                    category.map((cat) => (
                      <MenuItem key={cat.category_id} value={String(cat._id)}>
                        {cat.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            {/* 
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField {...field} required fullWidth label="Category" />
              )}
            /> */}
            <Controller
              name="discount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Discount"
                  type="number"
                  required
                />
              )}
            />

            <Controller
              name="vehicleType"
              control={control}
              render={({ field }) => (
                <TextField {...field} required fullWidth label="Vehicle Type" />
              )}
            />
            <InputLabel id="demo-simple-select-label">Vehicle Type</InputLabel>
            <Controller
              name="vehicleType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <MenuItem value={"None"}>None</MenuItem>
                  <MenuItem value={"Two Wheeler"}>Two Wheeler</MenuItem>
                  <MenuItem value={"Three Wheeler"}>Three Wheeler</MenuItem>
                  <MenuItem value={"Four Wheeler"}>Four Wheeler</MenuItem>
                </Select>
              )}
            />
            <Controller
              name="compatibility"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Compatibility"
                />
              )}
            />
            <Controller
              name="supplierName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Supplier Name"
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
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
