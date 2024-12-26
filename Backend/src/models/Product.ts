import { Schema, model, Document } from "mongoose";

interface IPart extends Document {
  OEMPartNumber: string;
  partNumber: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  vehicleType: string;
  compatibility: string[];
  imageUrl: string[];
  supplierName: string;
}

const partSchema = new Schema<IPart>(
  {
    OEMPartNumber: {
      type: String,
      required: true,
      unique: true,
    },
    partNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    compatibility: {
      type: [String],
      required: true,
    },
    imageUrl: {
      type: [String],
      required: true,
    },
    supplierName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Part = model<IPart>("Part", partSchema);

export default Part;
