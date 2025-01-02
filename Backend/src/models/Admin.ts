import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";
import crypto from "node:crypto";
// import bcrypt from "bcrypt";
// import ExpressError from "../utils/ExpressError";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  mobile: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  isAdmin: boolean;
  resetPasswordToken?: string;
  resetPasswordExpire?: string;
  getResetPasswordToken(): Promise<string>;
}

const AdminSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    isAdmin: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpire: String,
  },
  { timestamps: true }
);





// UserSchema.methods.getResetPasswordToken =
AdminSchema.methods.getResetPasswordToken = async function (): Promise<string> {
    const resetToken = crypto.randomBytes(20).toString("hex");
    // this.resetPasswordToken = crypto
    //     .createHash("sha256")
    //     .update(resetToken)
    //     .digest("hex");
    this.resetPasswordToken = resetToken;
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    console.log(resetToken);
    return resetToken;
};

declare module "mongoose" {
    interface Document {
        getResetPasswordToken(): Promise<string>;
    }
}


const AdminSchemaZod = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  mobile: z
    .string()
    .min(10, { message: "Mobile number must be at least 10 characters long" }),
  address: z.object({
    street: z.string().nonempty({ message: "Street is required" }),
    city: z.string().nonempty({ message: "City is required" }),
    state: z.string().nonempty({ message: "State is required" }),
    postalCode: z.string().nonempty({ message: "Postal code is required" }),
    country: z.string().nonempty({ message: "Country is required" }),
  }),
  googleId: z.string().optional(),
  facebookId: z.string().optional(),
  resetPasswordToken: z.string().optional(),
  resetPasswordExpire: z.string().optional(),
  // isAdmin: z.boolean().default(false),
});

const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);

export { Admin, AdminSchemaZod };
