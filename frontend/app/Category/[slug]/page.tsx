"use client";
import React from "react";
import Image from "next/image";
import { MoveRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
// import { Typography } from "@mui/material";

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
  succcess: boolean;
  products: Product[];
}

const Page = () => {
  const { slug } = useParams();
  const [products, setProducts] = React.useState<Product[]>([]);

  const fetchCategoryProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/product/category/${slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data: Data = await response.json();
      setProducts(data.products);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchCategoryProducts();
  }, []);
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mb-4">
          All Products
        </h1>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-auto">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white text-black p-6 rounded-lg border-2 shadow-lg max-w-sm"
            >
              {/* Product Image */}
              <div className="flex justify-center mb-4">
                <div className="bg-gray-700 w-32 h-32 rounded-md">
                  <Image
                    className="rounded-md"
                    src={
                      product.imageUrl
                        ? product.imageUrl[0] === null
                          ? "/DummyPlaceholder.webp"
                          : `http://localhost:5000/${product.imageUrl[0]}`
                        : "/DummyPlaceholder.webp"
                    }
                    width={200}
                    height={200}
                    alt="Product Image"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-lg text-gray-500 text-center font-semibold  mb-2">
                {product.brand.toUpperCase()}
              </h1>
              <h2 className="text-lg text-black font-semibold  mb-2">
                {product.name}
              </h2>
              <p className="text-lg text-left text-black  ">
                {product.description}
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
                      (product.price / 100) * (100 - product.discount)
                    )}{" "}
                  </span>
                  <span className="line-through text-sm text-gray-500">
                    ₹{product.price}
                  </span>
                </p>
                <p className="text-xl font-bold text-green-500 text-center ">
                  {" "}
                  {product.discount}% off
                </p>
              </div>
              <p className="text-red-500 mb-2">
                {" "}
                {product.stock} {product.stock > 1 ? "pieces" : "piece"} left!
              </p>
              <p className=" mb-4">
                {" "}
                Compatability:{" "}
                {product.compatibility.map((compatibility) => (
                  <span key={compatibility} className="">
                    {compatibility}
                    {", "}
                  </span>
                ))}
              </p>
              {/* Add to Cart Button */}
              <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-green-700 text-white font-medium py-2 rounded-md">
                Add to cart <ShoppingCart className="mx-4" />
              </button>
              <Link href={"/Product/" + product._id}>
                <button className="w-full flex items-center mt-5 justify-center bg-green-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md">
                  View More <MoveRight className="mx-4" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
