// import { Typography, Paper } from "@mui/material";
// import {  useEffect } from "react";
// import {
//   Inventory,
//   People,
//   AttachMoney,
//   ShoppingCart,
// } from "@mui/icons-material";
// import useFetch from "./hooks/useFetch";
import LoginPage from "./Login/page";

// const stats = [
//   { title: "Total Products", value: 150, icon: <Inventory /> },
//   { title: "Total Users", value: 1200, icon: <People /> },
//   { title: "Total Revenue", value: "$15,000", icon: <AttachMoney /> },
//   { title: "Total Orders", value: 450, icon: <ShoppingCart /> },
// ];

export default function Dashboard() {
  // useEffect(() => {
  //   // useFetch("https://jsonplaceholder.typicode.com/posts", "GET");
  //   try {
  //     // fetch("http://localhost:5000/", {
  //     //   method: "GET",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     // })
  //     //   .then((response) => response.json())
  //     //   .then((data) => {
  //     //     console.log(data);
  //     // })
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // },[]);
  return (
    <>
     <LoginPage/>
    </>
  );
}
