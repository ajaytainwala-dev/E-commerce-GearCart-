"use client";
import React from "react";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import {
  Inventory,
  People,
  AttachMoney,
  ShoppingCart,
} from "@mui/icons-material";
import { AlignLeft, Building2 } from "lucide-react";


export default function Dashboard() {
    // const [users, setUsers] = React.useState([]);
    // const [userCount , setUserCount] = React.useState(0);
    const [stats, setStats] = React.useState([
        { title: "Total Users", value: 0, icon: <People /> },
        { title: "Total Products", value: 0, icon: <Inventory /> },
        { title: "Total Revenue", value: "0", icon: <AttachMoney /> },
        { title: "Total Orders", value: 0, icon: <ShoppingCart /> },
        { title: "Total Brands", value: 0, icon: <Building2 /> },
        { title: "Total Categories", value: 0, icon: <AlignLeft /> },

    ]);
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/admin/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
        const data = await response.json();
        // setUsers(data);
        // setUserCount(data.length);
        setStats([
          { title: "Total Users", value: data.totalUsers, icon: <People /> },
          {
            title: "Total Products",
            value: data.totalProducts,
            icon: <Inventory />,
          },
          {
            title: "Total Revenue",
            value: data.totalRevenue,
            icon: <AttachMoney />,
          },
          {
            title: "Total Orders",
            value: data.totalOrders,
            icon: <ShoppingCart />,
          },
          {
            title: "Total Brands",
            value: data.totalBrands,
            icon: <Building2 />,
          },
          {
            title: "Total Categories",
            value: data.totalCatrgories,
            icon: <AlignLeft />,
          },
        ]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(localStorage.getItem("token") === null){
      window.location.href = "/Login";
    }
    fetchUsers();
  }, []);
  return (
    <>
      <div
        // className="flex items-center justify-center h-96 bg-gray-100 "
        style={{ padding: "20px", marginTop: "5rem" }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Welcome to the Dashboard
        </Typography>
        <div
          // className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{
            display: "grid",
            marginTop: "2rem",
            gap: "1rem",
            padding: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {stats.map((stat) => (
            <div key={stat.title}>
              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    marginBottom: "16px",
                    color: "#3f51b5",
                    fontSize: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {stat.icon}
                </div>
                <Typography
                  variant="h6"
                  component="h2"
                  style={{ fontWeight: 500, textAlign: "center" }}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant="h4"
                  component="p"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {stat.value}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
