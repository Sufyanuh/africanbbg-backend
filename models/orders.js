import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.Mixed, ref: "products", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  status: { type: String, default: "Pending" },
  totalPrice: { type: String },
  user: { type: Schema.Types.Mixed, ref: "users" },
});

export const Order = model("orders", orderSchema);
