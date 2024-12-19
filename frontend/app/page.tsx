// import Image from "next/image";
import Carousel from "../components/Slider/Slider";
import { Cog } from "lucide-react";
import Image from "next/image"

export default function Home() {
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
  const items = [
    {
      src: "https://img.freepik.com/premium-photo/3d-illustration-auto-parts-car-shock-absorber-oil-canister-fuel-air-filters-white-isolated-background-car-repair-parts_116124-10748.jpg?w=826",
      title: "Air Filter",
      cost: "$16.00",
    },
    {
      src: "https://img.freepik.com/free-photo/different-car-accessories-composition_23-2149030440.jpg?t=st=1734547558~exp=1734551158~hmac=8fb4a3f1a7d4aafae2e077a92d8f539e83e9e821ab17592aa1523910fefaa455&w=826",
      title: "Wrenches",
      cost: "$21.15",
    },
    {
      src: "https://img.freepik.com/free-photo/composition-different-car-accessories_23-2149030390.jpg?t=st=1734547476~exp=1734551076~hmac=1433a03a2dd61497a177763dcc5264e541b4996d1a3dbe0018a577edd8276119&w=826",
      title: "Lubricants",
      cost: "$12.00",
    },
    {
      src: "https://img.freepik.com/free-photo/different-car-accessories-composition_23-2149030385.jpg?t=st=1734547776~exp=1734551376~hmac=24438a9c8866d8d45c819c8cdf87e68e43069b1da45fa0685d61bd5217ad1efa&w=826",
      title: "Disc Pads",
      cost: "$18.40",
    },
    {
      src: "https://img.freepik.com/premium-photo/kit-timing-belt-with-rollers-white-wall_168171-317.jpg?w=826",
      title: "Clutch Transmission",
      cost: "$16.00",
    },
    {
      src: "https://img.freepik.com/premium-photo/car-parts_93675-66585.jpg?w=826",
      title: "Gears",
      cost: "$21.15",
    },
    {
      src: "https://img.freepik.com/premium-photo/various-car-parts-accessories-isolated-white-background_771335-36720.jpg?w=996",
      title: "Shock Absorber",
      cost: "$12.00",
    },
    {
      src: "https://img.freepik.com/premium-photo/various-car-parts-accessories-isolated-white-background_771335-35715.jpg?w=996",
      title: "Tyres",
      cost: "$18.40",
    },
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
      {/* Products */}
      <>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {items.map((item) => (
                <div key={item.src} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <a className="block relative h-48 rounded overflow-hidden">
                    <Image
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src={item.src}
                      layout="fill"
                      objectFit="cover"
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      CATEGORY
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {item.title}
                    </h2>
                    <p className="mt-1">{item.cost}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
      {/* Categories */}
      <>
        <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Shop by category
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
              {categories.map((category) => (
                <a
                  key={category.id}
                  href="#"
                  className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <span className="mr-2 text-primary-700 dark:text-primary-500">
                    <Cog className="w-5 h-5  text-white" />
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {category.name}
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
  );
}
