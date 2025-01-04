"use client";
import React from 'react'

const Page = () => {
    const [products, setProducts] = React.useState([{
        name: "No Products Found",
        price: 0,
        description: "",
        image: "/Placeholder/404-computer.svg",
      }]);
      const fetchCategoryProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/allproducts`
          );
          const data = await response.json();
          setProducts(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      React.useEffect(() => {
        fetchCategoryProducts();
        // console.log("useEffect", slug);
      }, []);
  return (
    <>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <li
            key={product.name}
            style={{
              margin: "1rem",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              width: "200px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px 8px 0 0",
              }}
            />
            <h2 style={{ fontSize: "1.25rem", margin: "0.5rem 0" }}>
              {product.name}
            </h2>
            <p style={{ fontSize: "1rem", color: "#666" }}>
              {product.description}
            </p>
            <p
              style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333" }}
            >
              {product.price}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Page
