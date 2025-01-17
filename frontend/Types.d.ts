 export interface Product {
  _id: string;
  id: number;
  partNumber: string;
  OEMPartNumber: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string[];
  discount: number;
  compatibility: string[];
  description: string;
  supplierName: string;
  vehicleType: string;
  stock: number;
  brand: string;
}
export interface Data {
  succcess: boolean;
  product: Product;
}


export interface Brand  {
  _id: string;
  brand_id: number;
  name: string;
  description: string;
  country_of_origin: string;
  logo_url: string;
}

export interface ICategory {
  _id: number;
  category_id: number;
  category_image: string;
  name: string;
  description: string;
  parent_Category: string;
}

export interface CategoryData {
  success: boolean;
  Category: Category[];
}