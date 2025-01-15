"use client";
import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { Brand } from "@/Types";
import { Upload } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function Page() {

  const router = useRouter();
  const {params} = useParams();
  const { pending } = useFormStatus();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [file, setFile] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Brand>();

  const onSubmit = async (data: Brand) => {
    console.log(params);
    console.log(data);
    try {
      setError(null);
      const formData = new FormData();
      formData.append("logo_url", data.logo_url);
      formData.append("brand_id", data.brand_id.toString());
      formData.append("name", data.name);
      formData.append("country_of_origin", data.country_of_origin);
      formData.append("description", data.description);

      const response = await fetch("http://localhost:5000/brand/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image.");

      setSubmitted(true);
      setTimeout(() => {
        router.push("/Success");
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center border-2 shadow-md justify-center gap-4 mt-[5rem] p-6 bg-gray-100">
      <Paper className="p-6 max-w-md mx-auto mt-[1rem]">
        <Typography variant="h4" gutterBottom>
          Add New Brand
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <Controller
            name="brand_id"
            control={control}
            rules={{ required: "Brand ID is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                required
                type="number"
                label="Brand ID"
                error={!!errors.brand_id}
                helperText={errors.brand_id ? errors.brand_id.message : ""}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            rules={{ required: "Brand name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Brand Name"
                required
                type="string"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />
          <Controller
            name="country_of_origin"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                label="Country Of Origin"
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
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description.message : ""
                }
              />
            )}
          />
          {submitted && (
            <Alert severity="success">Image uploaded successfully</Alert>
          )}
          <div>
            <Typography variant="h6" gutterBottom className="text-center">
              Add Brand Logo
            </Typography>
            <div className="mb-4">
              <Controller
                name="logo_url"
                control={control}
                render={({ field }) => (
                  <label
                    htmlFor="logo_url"
                    className="text-center text-xl cursor-pointer flex flex-col items-center justify-center gap-3 bg-slate-200 hover:bg-slate-300 p-6 rounded-md"
                  >
                    <Upload className="text-gray-500" />
                    <span className="text-gray-700">Brand Images</span>
                    <input
                      type="file"
                      id="logo_url"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          setFile(Array.from(e.target.files));
                          field.onChange(e.target.files); // Manually set the value
                        } else {
                          alert("You can only upload 1 file.");
                        }
                      }}
                      className="hidden"
                      required
                    />
                  </label>
                )}
              />
            </div>

            {errors.logo_url && (
              <p className="text-red-500 text-sm">
                {typeof errors.logo_url.message === "string" &&
                  errors.logo_url.message}
              </p>
            )}

            {file.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Selected files: {file.map((f) => f.name).join(", ")}
                </p>
              </div>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <Button type="submit" variant="contained" color="primary">
            {pending ? <CircularProgress size={24} /> : "Add Brand"}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
