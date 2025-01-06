import { Order } from "../../models/orders.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("products.product");

    res.status(200).json({ message: "Success", response: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
