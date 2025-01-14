"use client"
import React,{useEffect,useState} from 'react'
import type { Brand } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'

const Brand = () => {
      const [brand, setBrand] = useState<Brand[]>([]);
      const GetBrands = async () => {
        try {
          const response = await fetch(`http://localhost:5000/brand`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await response.json();
          setBrand(data.brands);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        GetBrands();
      }, []);
    
  return (
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
            {brand.map((brand) => (
              <Link
                key={brand.brand_id}
                href={`/Brands/${brand._id}`}
                className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <Image
                  src={
                    brand.logo_url
                      ? `http://localhost:5000/${brand.logo_url}`
                      : "/DummyPlaceholder.webp"
                  }
                  alt={brand.name}
                  width={32}
                  height={32}
                  className="rounded-lg m-2 "
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {brand.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Brand
