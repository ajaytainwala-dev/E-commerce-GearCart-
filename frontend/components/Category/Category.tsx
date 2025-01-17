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
  CardMedia,
} from "@mui/material";
import { ICategory, CategoryData } from "../../Types";
const Category = () => {
  const [category, setCategory] = useState<ICategory[]>([]);

  const fetchCategory = async () => {
    try {
      const response = await fetch("http://localhost:5000/category/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data: CategoryData = await response.json();
      setCategory(data.Category);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch category");
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
              {category &&
                category.map((category, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={index}
                    className="rounded-[2rem]"
                    sx={{borderRadius: "2rem"}}
                  >
                    <Card sx={{ boxShadow: 2, p: 1 }}>
                      <CardContent>
                        <CardMedia
                          component="img"
                          // height="100"
                          image={
                            category.category_image
                              ? `http://localhost:5000/${category.category_image}`
                              : "/DummyPlaceholder.webp"
                          }
                          alt={category.name}
                          sx={{
                            height: 100,
                            width: 100,
                            objectFit: "cover",
                            margin: "auto",
                            borderRadius: "1rem",
                            border: "1px solid #ccc",
                            boxShadow: "2px 2px 2px #ccc",
                            marginBottom: "1rem",
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold" }}
                          className="text-center"
                        >
                          {category.name}
                        </Typography>
                        <Link
                          href={`Category/${category.name}`}
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
