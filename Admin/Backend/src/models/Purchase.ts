import { Schema, model, Document } from "mongoose";
// import { User } from "./User";

interface IPurchase extends Document {
  userId: Schema.Types.ObjectId;
  items: {
    productId: Schema.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  purchaseDate: Date;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentStatus: string; // e.g., "Pending", "Completed", "Failed"
  deliveryStatus: string; // e.g., "Processing", "Shipped", "Delivered"
}

const purchaseSchema = new Schema<IPurchase>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Part",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    shippingAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    deliveryStatus: {
      type: String,
      required: true,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);

const Purchase = model<IPurchase>("Purchase", purchaseSchema);

export default Purchase;
