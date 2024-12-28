// import Image from "next/image";
import Carousel from "../components/Slider/Slider";
import { Cog } from "lucide-react";
// import Image from "next/image";
import {
  // Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Link,
} from "@mui/material";

import CTA from "@/components/CTA";
import Image from "next/image";
export default function Home() {
  const categori = [
    {
      title: "AIR FILTERS (PAPER)",
      image: "/Category/AirFilter.webp", // Replace with actual image path
      link: "/categories/air-filters",
    },
    {
      title: "BOLTS & NUTS",
      image: "/Category/BoltNut.webp", // Replace with actual image path
      link: "/categories/bolts-nuts",
    },
    {
      title: "CENTRE STANDS",
      image: "/Category/CenterStand.webp", // Replace with actual image path
      link: "/categories/centre-stands",
    },
    {
      title: "CRASH GUARDS",
      image: "/Category/CrashGuard.webp", // Replace with actual image path
      link: "/categories/centre-stands",
    },
    {
      title: "Fork Main Tubes",
      image: "/Category/ForkMainTube.webp", // Replace with actual image path
      link: "/categories/centre-stands",
    },
    {
      title: "Footrest Rods",
      image: "/Category/FootRestRod.webp", // Replace with actual image path
      link: "/categories/centre-stands",
    },
    {
      title: "Fork & Fork ASSY",
      image: "/Category/ForkAssy.webp", // Replace with actual image path
      link: "/categories/centre-stands",
    },
    {
      title: "Wheel Rims",
      image: "/Category/WheelRim.webp", // Replace with actual image path
      link: "/categories/centre-stands",
    },
    {
      title: "Clutch Pulleys",
      image: "/Category/ClutchPulley.webp", // Replace with actual image path
      link: "/categories/centre-stands",
    },
  ];

  const Brands =[
    {
      title: "Hero MotoCorp",
      image: "/Brands/HeroMotoCorp.webp",
      key: "hero-motocorp",
    },
    {
      title: "Honda Motorcycle",
      image: "/Brands/HondaMotorcycle.webp",
      key: "honda-motorcycle",
    },
    {
      title: "TVS Motor",
      image: "/Brands/TVSMotor.webp",
      key: "tvs-motor",
    },
    {
      title: "Bajaj Auto",
      image: "/Brands/BajajAuto.webp",
      key: "bajaj-auto",
    },
    {
      title: "Royal Enfield",
      image: "/Brands/RoyalEnfield.webp",
      key: "royal-enfield",
    },
    {
      title: "Yamaha Motor",
      image: "/Brands/YamahaMotor.webp",
      key: "yamaha-motor",
    },
    {
      title: "Suzuki Motorcycle",
      image: "/Brands/SuzukiMotorcycle.webp",
      key: "suzuki-motorcycle",
    },
    {
      title: "KTM",
      image: "/Brands/KTM.webp",
      key: "ktm",
    },
    {
      title: "Mahindra Two Wheelers",
      image: "/Brands/MahindraTwoWheelers.webp",
      key: "mahindra-two-wheelers",
    },
    {
      title: "Vespa",
      image: "/Brands/Vespa.webp",
      key: "vespa",
    },
    {
      title: "Aprilia",
      image: "/Brands/Aprilia.webp",
      key: "aprilia",
    },
    {
      title: "Harley Davidson",
      image: "/Brands/HarleyDavidson.webp",
      key: "harley-davidson",
    }
  ]
  const categories = [
    { id: 1, name: "Engine Parts" },
    { id: 2, name: "Suspension & Steering" },
    { id: 3, name: "Brakes & Brake Parts" },
    { id: 4, name: "Exhaust & Emissions" },
    { id: 5, name: "Transmission & Drivetrain" },
    { id: 6, name: "Electrical & Lighting" },
    { id: 7, name: "Cooling & Heating" },
    { id: 8, name: "Fuel Systems" },
    { id: 9, name: "Interior Parts" },
    { id: 10, name: "Exterior Parts" },
    { id: 11, name: "Wheels & Tires" },
    { id: 12, name: "Tools & Garage" },
    { id: 13, name: "Performance Parts" },
    { id: 14, name: "Body Parts" },
    { id: 15, name: "Filters" },
    { id: 16, name: "Oils & Fluids" },
    { id: 17, name: "Accessories" },
    { id: 18, name: "Batteries & Accessories" },
    { id: 19, name: "Belts & Hoses" },
    { id: 20, name: "Ignition System" },
  ];

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
        <section className="text-gray-600 body-font">
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
                          underline="hover"
                          color="primary"
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
        </section>
        {/* Categories */}
        <>
          <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  Shop by Brands
                </h2>
                <a
                  href="#"
                  title=""
                  className="flex items-center text-base font-medium text-primary-700 hover:underline dark:text-primary-500"
                >
                  See more categories
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Brands.map((brand) => (
                  <a
                    key={brand.key}
                    href="#"
                    className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <Image
                    src={brand.image}
                    alt={brand.title}
                    width={32}
                    height={32}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {brand.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
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
                <p className="mb-4 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg mb-3 lg:mb-5 lg:text-xl">
                  Don&apos;t Wait - Limited Stock at Unbeatable Prices!
                </p>
                <a
                  href="#"
                  className="inline-block rounded-lg bg-primary-700 px-6 py-3.5 text-center font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Shop Now
                </a>
              </div>
              <div className="hidden md:col-span-5 md:mt-0 md:flex">
                <img
                  className="dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg"
                  alt="shopping illustration"
                />
                <img
                  className="hidden dark:block"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list-dark.svg"
                  alt="shopping illustration"
                />
              </div>
            </div>
          </section>
        </>
      </>
    </>
  );
}
