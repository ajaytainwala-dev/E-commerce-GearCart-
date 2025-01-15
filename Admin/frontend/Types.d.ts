export interface Brand {
  _id: number;
  brand_id: number;
  name: string;
  description: string;
  country_of_origin: string;
  logo_url: string;
}

export interface BrandData{
    success:boolean;
    brands:Brand[];
}