"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Autocomplete
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { Brand } from "@/Types";
import { Upload } from "lucide-react";
import { useFormStatus } from "react-dom";
import Image from "next/image";

export default function Page() {
  const { action } = useParams<Record<string, string>>();
  const router = useRouter();
  const { pending } = useFormStatus();
  const [file, setFile] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand>();
  const fetchBrand = async () => {
    try {
      const response = await fetch(`http://localhost:5000/brand/${action[1]}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setBrands(data.brand);
    } catch (error) {
      setError(`${error}`);
    }
  };
  useEffect(() => {
    if (action[0] === "Edit") {
      fetchBrand();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValues = () => {
    if (action[0] === "Edit") {
      return { ...brands };
    } else {
      return {
        brand_id: "",
        name: "",
        description: "",
        country_of_origin: "",
      };
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Brand>({
    defaultValues: setValues(),
  });

  const onSubmit = async (data: Brand) => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append("logo", file[0]);
      formData.append("brand_id", data.brand_id);
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

      // setSubmitted(true);
      setTimeout(() => {
        router.push("/Success/Brand");
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    }
  };
  const UpdateSubmit = async (data: Brand) => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append("logo", file[0]);
      formData.append("brand_id", data.brand_id);
      formData.append("name", data.name);
      formData.append("country_of_origin", data.country_of_origin);
      formData.append("description", data.description);

      const response = await fetch(`http://localhost:5000/brand/${action[1]}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image.");

      // setSubmitted(true);
      setTimeout(() => {
        router.push("/Success/Brand");
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
        {action[0] === "Add" && (
          <>
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
                    value={field.value}
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
                    value={field.value}
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
                    value={field.value}
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
                    value={field.value}
                    error={!!errors.description}
                    helperText={
                      errors.description ? errors.description.message : ""
                    }
                  />
                )}
              />

              <div>
                <Typography variant="h6" gutterBottom className="text-center">
                  Add Brand Logo
                </Typography>
                <div className="mb-4">
                  {/* <Controller
                name="logo_url"
                control={control}
                render={({ field }) => ( */}
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
                      // {...field}
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setFile(Array.from(e.target.files));
                        } else {
                          alert("You can only upload 1 file.");
                        }
                      }}
                      className="hidden"
                      required
                    />
                  </label>
                  {/* )} */}
                  {/* /> */}
                </div>

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
          </>
        )}
        {action[0] === "Edit" && (
          <>
            <Typography variant="h4" gutterBottom>
              Edit Brand
            </Typography>
            <form
              onSubmit={handleSubmit(UpdateSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Autocomplete
                id="brand_id"
                freeSolo
                options={brands?.brand_id ? [String(brands?.brand_id)] : []}
                renderInput={(params) => (
                  <Controller
                    name="brand_id"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Typography>Brand ID</Typography>
                        <TextField
                          {...field}
                          {...params}
                          type="number"
                          placeholder={brands?.brand_id}
                          error={!!errors.brand_id}
                          // value={field.value || brands?.brand_id}
                          value={field.value}
                          helperText={
                            errors.brand_id ? errors.brand_id.message : ""
                          }
                        />
                      </>
                    )}
                  />
                )}
              />

              <Autocomplete
                id="name"
                freeSolo
                options={brands?.name ? [brands?.name] : []}
                renderInput={(params) => (
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Typography>Brand Name</Typography>
                        <TextField
                          {...field}
                          {...params}
                          placeholder={brands?.name}
                          value={field.value}
                          type="string"
                          error={!!errors.name}
                          helperText={errors.name ? errors.name.message : ``}
                        />
                      </>
                    )}
                  />
                )}
              />
              <Autocomplete
                id="country_of_origin"
                freeSolo
                options={
                  brands?.country_of_origin ? [brands?.country_of_origin] : []
                }
                renderInput={(params) => (
                  <Controller
                    name="country_of_origin"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Typography>Country of Origin</Typography>
                        <TextField
                          {...field}
                          {...params}
                          placeholder={brands?.country_of_origin}
                          value={field.value}
                          fullWidth
                        />
                      </>
                    )}
                  />
                )}
              />
              <Autocomplete
                id="description"
                freeSolo
                options={
                  brands?.description ? [brands?.description] : []
                }
                renderInput={(params) => (
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Typography>Description</Typography>
                        <TextField
                          {...field}
                          {...params}
                          multiline
                          rows={4}
                          placeholder={brands?.description}
                          value={field.value}
                          error={!!errors.description}
                          helperText={
                            errors.description ? errors.description.message : ""
                          }
                        />
                      </>
                    )}
                  />
                )}
              />

              <>
                <Typography>Current Logo</Typography>
                <Image
                  alt="brand logo"
                  src={
                    brands?.logo_url
                      ? `http://localhost:5000/${brands?.logo_url}`
                      : "/DummyPlaceholder.webp"
                  }
                  height={300}
                  width={300}
                />
              </>
              <div>
                <Typography variant="h6" gutterBottom className="text-center">
                  Add Brand Logo to overwrite current logo
                </Typography>
                <div className="mb-4">
                  <label
                    htmlFor="logo_url"
                    className="text-center text-xl cursor-pointer flex flex-col items-center justify-center gap-3 bg-slate-200 hover:bg-slate-300 p-6 rounded-md"
                  >
                    <Upload className="text-gray-500" />
                    <span className="text-gray-700">Brand Images</span>
                    <input
                      name="logo_url"
                      type="file"
                      id="logo_url"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setFile(Array.from(e.target.files));
                        } else {
                          alert("You can only upload 1 file.");
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  {/* )} */}
                  {/* /> */}
                </div>

                {file.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">
                      Selected files: {file.map((f) => f.name).join(", ")}
                    </p>
                  </div>
                )}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w[100%] mx-auto"
              >
                {pending ? <CircularProgress size={24} /> : "Add Brand"}
              </Button>
            </form>
          </>
        )}
      </Paper>
    </div>
  );
}
