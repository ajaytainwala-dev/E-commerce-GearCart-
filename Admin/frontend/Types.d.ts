import { CategoryData } from '@/Types';
import { Product } from '..';
export interface Brand {
  _id: number;
  brand_id: string;
  name: string;
  description: string;
  country_of_origin: string;
  logo_url: string;
}

export interface BrandData{
    success:boolean;
    brands:Brand[];
}

export interface Category {
  _id: number;
  category_id: number;
  category_image: string;
  name: string;
  description: string;
  parent_Category: string;
}

export interface CategoryData{
    success:boolean;
    Category:Category[];
}

interface Product {
  _id: string;
  id: number;
  partNumber: string;
  OEMPartNumber: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  discount: number;
  compatibility: string[];
  description: string;
  supplierName: string;
  vehicleType: string;
  stock: number;
  brand: string;
}

export interface ProductData{
  success:boolean;
  products:Product;
}

export interface DeleteData {
  success: boolean;
  message: string;
}