import { Category } from "@/Types";
import { ReactNode } from "react";
export interface AppProviderProps {
  children: ReactNode;
}

export interface AppContextProps {
  isLogin: boolean;
  stats: Stats[];
  fetchDashboardData: () => void;
  doLogin: (data: { email: string; password: string }) => void;
  fetchAllProducts: () => void;
  products: Product[];
  deleteProduct: (id: number) => Promise<{ success: boolean; message: string }>;
  fetchOneProduct: (
    id: string
  ) => Promise<{
    success: boolean;
    product: Product;
   
  }>;
  fetchAdminProduct: (id: string) => Promise<{
    success: boolean;
    product: Product ;
    category: Category ;
    brand: Brand;
  }>;
}
