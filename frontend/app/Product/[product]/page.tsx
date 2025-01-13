"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Product, Data } from "@/Types";
import Image from "next/image";
import { Button, Typography } from "@mui/material";

const Page = () => {
  const { product } = useParams();
  const [products, setProducts] = React.useState<Product>({
    name: "",
    brand: "",
    id: 0,
    _id: "",
    partNumber: "",
    OEMPartNumber: "",
    stock: 0,
    vehicleType: "",
    compatibility: [],
    category: "",
    description: "",
    discount: 0,
    price: 0,
    imageUrl: [""],
    supplierName: "",
  });
  const fetchCategoryProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/product/product/${product}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data: Data = await response.json();
      // console.log(data.product);
      setProducts(data.product);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchCategoryProducts();
    console.log("useEffect", product);
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden p-7 ">
        <h1 className="text-2xl font-bold mb-4">
          Products {"> "}
          {products.category.split(" ").map((word)=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ")}
        </h1>
        <div className="container  py-24 mx-auto bg-white rounded-lg">
          <div className="lg:w-4/5 mx-auto flex flex-wrap items-center  flex-row">
            <Image
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded border-2  shadow-xl "
              src={
                products.imageUrl
                  ? `http://localhost:5000/${products.imageUrl[0]}`
                  : "/DummyPlaceholder.webp"
              }
              width={600}
              height={600}
              priority={true}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <Typography
                variant="h2"
                className="text-red-900 text-4xl text-center title-font font-bold mb-1"
              >
                {products.name}
              </Typography>
              <Typography className="text-3xl  title-font text-blue-600  tracking-widest">
                {products.brand}
              </Typography>

              <p className="text-lg text-left text-black  ">
                {products.description}
              </p>
              {/* Product Price */}
              <div
                className="flex "
                style={{ justifyContent: "space-between" }}
              >
                <p className="text-xl  text-black text-center ">
                  <span className="text-xl font-bold text-black text-center ">
                    ₹
                    {Math.floor(
                      (products.price / 100) * (100 - products.discount)
                    )}{" "}
                  </span>
                  <span className="line-through text-sm text-gray-500">
                    ₹{products.price}
                  </span>
                </p>
                <p className="text-xl font-bold text-green-500 text-center ">
                  {" "}
                  {products.discount}% off
                </p>
              </div>

              <p className=" mb-4">
                {" "}
                Compatability:{" "}
                {products.compatibility.map((compatibility) => (
                  <span key={compatibility} className="">
                    {compatibility}
                    {", "}
                  </span>
                ))}
              </p>

              <Typography>
                For{" "}
                {products.vehicleType
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Typography>

              <p className="text-red-500 mb-2 text-xl">
                {" "}
                {products.stock} {products.stock > 1 ? "pieces" : "piece"} left!
              </p>
              <div className="flex flex-col flex-wrap mt-4">
                <Button
                  variant="contained"
                  className="  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded mt-8"
                >
                  Add to Cart
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
