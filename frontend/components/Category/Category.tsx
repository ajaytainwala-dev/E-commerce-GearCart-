"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  //   CardMedia,
  CardContent,
  Typography,
  Link,
  Button,
} from "@mui/material";

const Category = () => {
  const [category, setCategory] = useState<string[]>([]);
//   const categori = [
//     {
//       title: "AIR FILTERS (PAPER)",
//       image: "/Category/AirFilter.webp", // Replace with actual image path
//       link: "/Category/air-filters",
//     },
//     {
//       title: "BOLTS & NUTS",
//       image: "/Category/BoltNut.webp", // Replace with actual image path
//       link: "/Category/bolts-nuts",
//     },
//     {
//       title: "CENTRE STANDS",
//       image: "/Category/CenterStand.webp", // Replace with actual image path
//       link: "/Category/centre-stands",
//     },
//     {
//       title: "CRASH GUARDS",
//       image: "/Category/CrashGuard.webp", // Replace with actual image path
//       link: "/Category/centre-stands",
//     },
//     {
//       title: "Fork Main Tubes",
//       image: "/Category/ForkMainTube.webp", // Replace with actual image path
//       link: "/Category/centre-stands",
//     },
//     {
//       title: "Footrest Rods",
//       image: "/Category/FootRestRod.webp", // Replace with actual image path
//       link: "/Category/centre-stands",
//     },
//     {
//       title: "Fork & Fork ASSY",
//       image: "/Category/ForkAssy.webp", // Replace with actual image path
//       link: "/Category/centre-stands",
//     },
//     {
//       title: "Wheel Rims",
//       image: "/Category/WheelRim.webp", // Replace with actual image path
//       link: "/Category/centre-stands",
//     },
//     {
//       title: "Clutch Pulleys",
//       image: "/Category/ClutchPulley.webp", // Replace with actual image path
//       link: "/Category/centre-stands",
//     },
//   ];
  const fetchCategory = async () => {
    try {
      const response = await fetch("http://localhost:5000/product/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setCategory(data.categories);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-4 mx-auto">
          <h1 className="text-gray-900 text-3xl font-bold m-2  mb-3">
            SHOP BY CATEGORIES
          </h1>

          <div className="flex flex-wrap -m-4">
            <Grid
              container
              spacing={3}
              className="m-2 p-1 mx-auto"
              justifyContent="center"
            >
              {category.map((category, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} className="rounded-[2rem]">
                  <Card sx={{ boxShadow: 2, p: 1 }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold" }}
                        className="text-center"
                      >
                        {category
                          .split(" ")
                          .map(
                            (word: string) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </Typography>
                      <Link
                        href={`Category/${category}`}
                        style={{ color: "blue" }}
                        className="flex items-center justify-center my-5"
                      >
                        <Button variant="contained" color="primary">
                          More &gt;
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
