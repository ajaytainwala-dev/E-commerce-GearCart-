import { CategoryData } from '@/Types';
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