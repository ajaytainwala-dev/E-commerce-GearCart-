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
