import { Schema, model } from "mongoose";
const productSchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export const Product = model("products", productSchema);
