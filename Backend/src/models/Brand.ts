import mongoose, { Schema, Document } from "mongoose";

interface IBrand extends Document {
  brand_id: number;
  name: string;
  description: string;
  country_of_origin: string;
  logo_url: string;
}

const BrandSchema: Schema = new Schema({
  brand_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  country_of_origin: {
    type: String,
    required: true,
  },
  logo_url: {
    type: String,
    required: false,
  },
});

const Brand = mongoose.model<IBrand>("Brand", BrandSchema);

export default Brand;
