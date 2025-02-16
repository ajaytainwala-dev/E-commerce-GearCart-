"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Typography,
  Button,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Paper,
  TableHead
} from "@mui/material";
import { Context } from "@/app/ContextAPI/AppContext";
import { Category, Product, Brand } from "@/Types";
import { Edit, Trash } from "lucide-react";

interface ResponseData {
  success: boolean;
  product: Product;
  category: Category;
  brand: Brand;
}

const Page = () => {
  const { fetchAdminProduct } = useContext(Context);
  const { id } = useParams() as { id: string };

  const [data, setData] = useState<ResponseData>({
    success: false,
    product: {
      _id: "",
      id: 0,
      partNumber: "",
      OEMPartNumber: "",
      name: "",
      price: 0,
      category: "",
      imageUrl: "",
      discount: 0,
      compatibility: [],
      description: "",
      supplierName: "",
      vehicleType: "",
      stock: 0,
      brand: "",
    },
    category: {
      _id: 0,
      category_id: 0,
      category_image: "",
      name: "",
      description: "",
      parent_Category: "",
    },
    brand: {
      _id: 0,
      brand_id: "",
      name: "",
      description: "",
      country_of_origin: "",
      logo_url: "",
    },
  });

  const fetchAdminProducts = async () => {
    try {
      if (id) {
        const { success, product, category, brand } = await fetchAdminProduct(
          id
        );
        setData({
          success: success,
          product: product,
          category: category,
          brand: brand,
        });
        console.log("Product fetched");
        // console.log(success, product, category, brand);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdminProducts();
    //  eslint-disable-next-line
  }, []);
  // console.log(data);
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <TableContainer component={Paper}>
            <Table>
                    <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                      <Typography variant="h4" className="text-[3rem] text-center">
                        Product Details
                      </Typography>
                      </TableCell>
                    </TableRow>
                    </TableHead>
              <TableBody className="m-auto">
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <Image
                      alt="ecommerce"
                      className="w-[30%] m-auto object-cover object-center rounded border-2 shadow-xl"
                      src={
                        data.product.imageUrl
                          ? `http://localhost:5000/${data.product.imageUrl[0]}`
                          : "/DummyPlaceholder.webp"
                      }
                      width={600}
                      height={600}
                      priority={true}
                    />
                    <Typography
                      variant="h3"
                      align="center"
                      className="mt-4 text-blue-700 my-5 text-[3rem]"
                    >
                      {data.product.name}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Brand</TableCell>
                  <TableCell>{data.brand.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ID</TableCell>
                  <TableCell>{data.product.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Product ID</TableCell>
                  <TableCell>{data.product._id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Part No</TableCell>
                  <TableCell>{data.product.partNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">OEM Part Number</TableCell>
                  <TableCell>{data.product.OEMPartNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Item in Stock</TableCell>
                  <TableCell>{data.product.stock}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Supplier Name</TableCell>
                  <TableCell>
                    {data.product.supplierName
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Vehicle Type</TableCell>
                  <TableCell>
                    {data.product.vehicleType
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Compatibility</TableCell>
                  <TableCell>
                    {data.product.compatibility.map((item) => (
                      <Typography
                        variant="body1"
                        key={item}
                        className="text-red-600 font-bold"
                      >
                        {item
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </Typography>
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Category</TableCell>
                  <TableCell>{data.category?.name || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Description</TableCell>
                  <TableCell>{data.product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Discount</TableCell>
                  <TableCell>{data.product.discount}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Price</TableCell>
                  <TableCell>₹{data.product.price}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Discounted Price
                  </TableCell>
                  <TableCell>
                    ₹
                    {Math.floor((data.product.price / 100) * (100 - data.product.discount))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Actions</TableCell>
                  <TableCell>
                    <div className="flex gap-4 items-center justify-center">
                      <Button
                        variant="contained"
                        className="ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded mt-8 mx-5"
                      >
                        Edit Product <Edit />
                      </Button>
                      <Button
                        variant="contained"
                        className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded mr-4 "
                      >
                        Delete Product <Trash />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>
    </>
  );
};
export default Page;
