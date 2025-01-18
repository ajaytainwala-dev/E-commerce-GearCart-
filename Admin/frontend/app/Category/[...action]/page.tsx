"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  // Autocomplete,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { Category, CategoryData } from "@/Types";
import { Upload } from "lucide-react";
import { useFormStatus } from "react-dom";
import Image from "next/image";

export default function Page() {
  const { action } = useParams<Record<string, string>>();
  const router = useRouter();
  const { pending } = useFormStatus();
  const [file, setFile] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [category, setcategory] = useState<Category>();
  const [AllCategory, setAllCategory] = useState<Category[]>();
  // const [age, setAge] = useState<number | string>('');

  const fetchAllCategories = async () => {
    try {
      const response = await fetch(`http://localhost:5000/category/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data: CategoryData = await response.json();
      setAllCategory(data.Category);
    } catch (error) {
      setError(`${error}`);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/category/${action[1]}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setcategory(data.Category);
    } catch (error) {
      setError(`${error}`);
    }
  };
  useEffect(() => {
    if (action[0] === "Edit") {
      fetchCategory();
    }
    fetchAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValues = () => {
    if (action[0] === "Edit") {
      return { ...category };
    } else {
      return {
        category_id: 0,
        name: "",
        description: "",
        parent_Category: "",
      };
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>({
    defaultValues: setValues(),
  });

  const onSubmit = async (data: Category) => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append("image", file[0]);
      formData.append("category_id", String(data.category_id));
      formData.append("name", data.name);
      // formData.append("parent_Category", data.parent_Category);
      formData.append("description", data.description);

      const response = await fetch("http://localhost:5000/category/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image.");

      // setSubmitted(true);
      setTimeout(() => {
        router.push("/Success/Category");
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    }
  };
  const UpdateSubmit = async (data: Category) => {
    try {
      console.log(data);
      setError(null);
      const formData = new FormData();
      formData.append("image", file[0]);
      formData.append("category_id", String(data.category_id));
      formData.append("name", data.name);
      // formData.append("parent_Category", data.parent_Category);
      formData.append("description", data.description);

      const response = await fetch(
        `http://localhost:5000/category/${action[1]}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload image.");

      setTimeout(() => {
        router.push("/Success/Category");
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
              Add New Category
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Controller
                name="category_id"
                control={control}
                rules={{ required: "Brand ID is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    type="number"
                    label="Category ID"
                    value={field.value ?? 0}
                    error={!!errors.category_id}
                    helperText={
                      errors.category_id ? errors.category_id.message : ""
                    }
                  />
                )}
              />
              <Controller
                name="name"
                control={control}
                rules={{ required: "Category name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Category Name"
                    required
                    value={field.value}
                    type="string"
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ""}
                  />
                )}
              />

              <InputLabel id="demo-simple-select-label">
                Parent Category
              </InputLabel>
              <Controller
                name="parent_Category"
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
                    {AllCategory &&
                      AllCategory.map((cat) => (
                        <MenuItem key={cat.category_id} value={cat.category_id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                  </Select>
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
                  Add Category Image
                </Typography>
                <div className="mb-4">
                  <label className="text-center text-xl cursor-pointer flex flex-col items-center justify-center gap-3 bg-slate-200 hover:bg-slate-300 p-6 rounded-md">
                    <Upload className="text-gray-500" />
                    <span className="text-gray-700">Category Images</span>
                    <input
                      name="category_image"
                      type="file"
                      id="category_image"
                      accept="image/*"
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
                className="w-full mx-auto"
              >
                Add Category
              </Button>
            </form>
          </>
        )}
        {action[0] === "Edit" && (
          <>
            <Typography variant="h4" gutterBottom>
              Edit Category Details
            </Typography>
            <form
              onSubmit={handleSubmit(UpdateSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
        
                  <Controller
                    name="category_id"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Typography>Brand ID</Typography>
                        <TextField
                          {...field}
                          type="number"
                          placeholder={String(category?.category_id)}
                          error={!!errors.category_id}
                          defaultValue={(category?.category_id)}
                          value={field.value}

                          helperText={
                            errors.category_id ? errors.category_id.message : ""
                          }
                        />
                      </>
                    )}
                  />
             
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Typography>Brand Name</Typography>
                        <TextField
                          fullWidth
                          {...field}
                          placeholder={category?.name}
                          // defaultValue={category?.name}
                          value={field.value}
                          type="string"
                          error={!!errors.name}
                          helperText={errors.name ? errors.name.message : ``}
                        />
                      </>
                    )}
                  />
              

              <InputLabel id="demo-simple-select-label">
                Parent Category
              </InputLabel>
              <Controller
                name="parent_Category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={category?.parent_Category ?? ""}
                    value={field.value}
                    onChange={(event) => field.onChange(event.target.value)}
                  >
                    <MenuItem value={0}>None</MenuItem>
                    {AllCategory &&
                      AllCategory.map((cat) => (
                        <MenuItem key={cat.category_id} value={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <>
                    <Typography>Description</Typography>
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={4}
                      placeholder={category?.description}
                      defaultValue={category?.description || 0}
                      value={field.value}
                      error={!!errors.description}
                      helperText={
                        errors.description ? errors.description.message : ""
                      }
                    />
                  </>
                )}
              />

              <>
                <Typography>Current Logo</Typography>
                <Image
                  alt="brand logo"
                  src={
                    category?.category_image
                      ? `http://localhost:5000/${category?.category_image}`
                      : "/DummyPlaceholder.webp"
                  }
                  height={300}
                  width={300}
                />
              </>
              <div>
                <Typography variant="h6" gutterBottom className="text-center">
                  Reupload category image to overwrite current logo
                </Typography>
                <div className="mb-4">
                  <label
                    htmlFor="category_image"
                    className="text-center text-xl cursor-pointer flex flex-col items-center justify-center gap-3 bg-slate-200 hover:bg-slate-300 p-6 rounded-md"
                  >
                    <Upload className="text-gray-500" />
                    <span className="text-gray-700">Category Images</span>
                    <input
                      name="category_image"
                      type="file"
                      id="category_image"
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
                {pending ? <CircularProgress size={24} /> : "Edit Category"}
              </Button>
            </form>
          </>
        )}
      </Paper>
    </div>
  );
}
