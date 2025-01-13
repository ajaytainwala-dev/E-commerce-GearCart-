"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Typography, Button } from "@mui/material";

interface Product {
  _id: string;
  id: number;
  partNumber: string;
  OEMPartNumber: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  discount: number;
  compatibility: string[];
  description: string;
  image: string;
  supplierName: string;
  vehicleType: string;
  stock: number;
  brand: string;
}

interface Data {
  product: Product;
  success: boolean;
}

const Page = () => {
  const { id } = useParams();
  const [product, setProducts] = useState<Data>({
    product: {
      _id: "",
      id: 0,
      OEMPartNumber: "",
      partNumber: "",
      name: "",
      category: "",
      price: 0,
      vehicleType: "",
      discount: 0,
      supplierName: "",
      compatibility: [],
      imageUrl: "",
      description: "",
      image: "",
      brand: "",
      stock: 0,
    },
    success: false,
  });
  const fetchCategoryProducts = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/product/product/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data: Data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchCategoryProducts();
    console.log("useEffect", id);
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap items-center ">
            <Image
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded border-2  shadow-xl"
              src={
                product.product.imageUrl
                  ? `http://localhost:5000/${product.product.imageUrl[0]}`
                  : "/DummyPlaceholder.webp"
              }
              width={600}
              height={600}
             
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <Typography
                variant="h2"
                className="text-red-900 text-4xl title-font font-medium mb-1"
              >
                {product.product.name}
              </Typography>
              <Typography className="text-lg title-font text-gray-600  tracking-widest">
                Brand : {product.product.brand}
              </Typography>
              <Typography> ID : {product.product.id}</Typography>
              <Typography>Product ID : {product.product._id}</Typography>
              <Typography>Part No : {product.product.partNumber}</Typography>
              <Typography>
                OEM Part Number No : {product.product.OEMPartNumber}
              </Typography>
              <Typography>Item in Stock : {product.product.stock}</Typography>
              <Typography>
                Supplier Name :{" "}
                {product.product.supplierName
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Typography>
              <Typography>
                Vehicle Type :{" "}
                {product.product.vehicleType
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Typography>
              <Typography variant="h6">
                Compatability :{" "}
                {product.product.compatibility.map((item) => (
                  <Typography variant="body1" key={item} className="ml-4">
                    {item
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Typography>
                ))}
              </Typography>
              <Typography className="text-lg mt-4 title-font text-gray-600  tracking-widest">
                Category :{" "}
                {product.product.category
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Typography>

              <Typography className="leading-relaxed">
                Description : {product.product.description}
              </Typography>

              <div className="flex flex-col flex-wrap mt-4">
                <Typography
                  variant="h6"
                  className="title-font font-medium text-2xl text-gray-900"
                >
                  Discount : {product.product.discount}%
                </Typography>
                <Typography
                  variant="h6"
                  className="title-font font-medium text-2xl text-gray-900"
                >
                  Price : ₹{product.product.price}
                </Typography>
                <Typography
                  variant="h6"
                  className="title-font font-medium text-2xl text-gray-900"
                >
                  Discounted Price : ₹
                  {(product.product.price / 100) *
                    (100 - product.product.discount)}
                </Typography>
                <Button
                  variant="contained"
                  className=" ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded mt-8"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Page;
