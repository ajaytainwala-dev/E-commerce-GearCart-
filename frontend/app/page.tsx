"use client";
import React from "react";
import Carousel from "../components/Slider/Slider";

import Link from "next/link";
import Category from "@/components/Category/Category";
import {
  // Box,
  Button,
} from "@mui/material";
import CTA from "@/components/CTA";
import Image from "next/image";
import Brand from "@/components/Brand/Brand";

export default function Home() {

  const images = [
    "/Placeholder/ThirdHero.webp",
    "/Placeholder/SecondHero.webp",
    "/Placeholder/FirstHeroImg.webp",
    // "https://via.placeholder.com/800x600?text=Image+2",
    // "https://via.placeholder.com/800x600?text=Image+3",
  ];
  return (
    <>
      {/* Carousel */}
      <Carousel items={images} interval={4000} />
      <CTA />
      {/* Products */}

      <>
        <Category />
        {/* <section className="text-gray-600 body-font">
          <div className="container px-5 py-4 mx-auto">
            <h1 className="text-gray-900 text-3xl font-bold m-2  mb-3">
              SHOP BY CATEGORIES
            </h1>

            <div className="flex flex-wrap -m-4">
              <Grid
                container
                spacing={3}
                className="m-2 p-2 mx-auto"
                justifyContent="center"
              >
                {categori.map((category, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ boxShadow: 2, p: 2 }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={category.image}
                        alt={category.title}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {category.title}
                        </Typography>
                        <Link
                          href={category.link}
                          style={{ textDecoration: "underline", color: "blue" }}
                        >
                          More &gt;
                        </Link>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </section> */}
        {/* Categories */}
        <>
          <Brand />
        </>
        {/* CTA */}
        <>
          <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto grid max-w-screen-xl px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
              <div className="content-center justify-self-start md:col-span-7 md:text-start">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">
                  Limited Time Offer!
                  <br />
                  Up to 50% OFF!
                </h1>
                <p className="mb-4 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg  lg:mb-5 lg:text-xl">
                  Don&apos;t Wait - Limited Stock at Unbeatable Prices!
                </p>
                <Link
                  href="/AllProducts"
                  className="inline-block rounded-lg bg-primary-700 px-6 py-3.5 text-center font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <Button variant="contained">Shop Now</Button>
                </Link>
              </div>
              <div className="hidden md:col-span-5 md:mt-0 md:flex">
                <Image
                  className="dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg"
                  alt="shopping illustration"
                  width={500}
                  height={500}
                />
                <Image
                  className="hidden dark:block"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list-dark.svg"
                  alt="shopping illustration"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </section>
        </>
      </>
    </>
  );
}
