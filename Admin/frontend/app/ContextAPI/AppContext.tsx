"use client";
import AxiosInstance from "@/utils/AxiosInstance";
import { createContext, useEffect, useState } from "react";
import { AppContextProps, AppProviderProps } from "./types";
import {
  Inventory,
  People,
  AttachMoney,
  ShoppingCart,
} from "@mui/icons-material";
import { AlignLeft, Building2 } from "lucide-react";
import { Product } from "@/Types";

export const Context = createContext<AppContextProps>(null!);

export const AppProvider = ({ children }: AppProviderProps) => {
  // All States
  const [isLogin, setIsLogin] = useState(false);
  const [stats, setStats] = useState([
    { title: "Total Users", value: 0, icon: <People /> },
    { title: "Total Products", value: 0, icon: <Inventory /> },
    { title: "Total Revenue", value: "0", icon: <AttachMoney /> },
    { title: "Total Orders", value: 0, icon: <ShoppingCart /> },
    { title: "Total Brands", value: 0, icon: <Building2 /> },
    { title: "Total Categories", value: 0, icon: <AlignLeft /> },
  ]);
  const [products, setProducts] = useState<Product[]>([]);

  //   All Functions
  // Do Login
  const doLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await AxiosInstance.post("/auth/login", data);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsLogin(true);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  //   Fetches the Dashboard data
  const fetchDashboardData = async () => {
    try {
      const response = await AxiosInstance.get("/admin/dashboard");
      const { data } = response;
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
      console.error("Error fetching dashboard data:", error);
    }
  };

  //   Fetch All Products
  const fetchAllProducts = async () => {
    try {
      const response = await AxiosInstance.get("/product/allproducts");
      const { data } = response;
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchOneProduct = async (id: string) => {
    try {
      const response = await AxiosInstance.get(`/product/product/${id}`);
      const { data } = response;
    
      return { success: data.success, product: data.product};
    } catch (error) {
      console.error("Error fetching product:", error);
      return { success: false, product: null};
    }
  };

  // Delete Product
  const deleteProduct = async (id: number) => {
    try {
      const response = await AxiosInstance.delete(`/product/remove/${id}`);
      const { data } = response;
      return { success: data.success, message: data.message };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "Failed to delete product." };
    }
  };

  //   Fetch One Category Data
  const fetchAdminProduct = async (id: string) => {
      try {
        const response = await AxiosInstance.get(`/product/adminProduct/${id}`);
        const { data } = response;
        return { success:data.success,product:data.product,category: data.category,brand:data.brand };
      } catch (error) {
        console.log(error);
        return { success: false, product: null, category: null, brand: null };
      }
    };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        isLogin,
        stats,
        fetchDashboardData,
        doLogin,
        fetchAllProducts,
        products,
        deleteProduct,
        fetchOneProduct,
        fetchAdminProduct,
      }}
    >
      {children}
    </Context.Provider>
  );
};
