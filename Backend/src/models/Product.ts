import { Schema, model, Document } from "mongoose";

interface IPart extends Document {
  id: number;
  OEMPartNumber: string;
  partNumber: string;
  name: string;
  brand: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
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
    id: {
      type: Number,
      required: true,
      unique: true,
      auto: true,
    },
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
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
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

const Product = model<IPart>("Part", partSchema);

// export default Part;
export { Product };
export type { IPart };
