"use client"
import React from 'react'
import {  useFormStatus } from 'react-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, CircularProgress } from '@mui/material'
import { Upload } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import {Alert} from "@mui/material"
interface ImageURL {
  imageUrl: string[];
}

const Page = () => {
    const { id } = useParams();
    const router = useRouter();
 const { pending } = useFormStatus();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState<File[]>([]);
  const [imageURL, setImageURL] = useState<string[]>([]);
const [submited, setSubmited] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function doSubmit() {
    try {
      setError(null);
      const formData = new FormData();
      file.forEach((f) => formData.append("images", f));
      const response = await fetch(`http://localhost:5000/admin/add/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload image.");
      const data: ImageURL = await response.json();
      setImageURL(data.imageUrl);
      setSubmited(true);
      setTimeout(()=>{
        router.push("/Success")
      })
      console.log(imageURL);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    }
  }


  return (
    <>
    {submited && (  <Alert severity="success">Image uploaded successfully</Alert>)}
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-[4rem]">
      <form onSubmit={handleSubmit(doSubmit)} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
        <label
          htmlFor="image"
          className="text-center text-xl cursor-pointer flex flex-col items-center justify-center gap-3 bg-slate-200 hover:bg-slate-300 p-6 rounded-md"
        >
          <Upload className="text-gray-500" />
          <span className="text-gray-700">Product Images</span>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image")}
            onChange={(e) => {
            if (e.target.files && e.target.files.length <= 4) {
              setFile(Array.from(e.target.files));
            } else {
              alert("You can only upload up to 4 files.");
            }
            }}
            className="hidden"
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
        className="w-full"
        >
        {pending ? <CircularProgress size={24} /> : "Upload Image"}
        </Button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
    </>
  );
}

export default Page
