import { Order } from "../../models/orders.js";
import { Product } from "../../models/product.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "user._id": req.user._id }).populate(
      "products.product"
    );

    res.status(200).json({ message: "Success", response: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const OrderNow = async (req, res) => {
  try {
    const user = req.user;
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products are required" });
    }

    let totalPrice = 0;
    const orderProducts = [];

    for (const item of products) {
      const { productId, quantity } = item;

      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({
          message: "Each product must have a valid productId and quantity",
        });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${productId}` });
      }

      if (product.quantity < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${product.name}`,
        });
      }

      product.quantity -= quantity;
      await product.save();

      orderProducts.push({
        product: product,
        quantity: quantity,
      });

      totalPrice += product.price * quantity;
    }

    const newOrder = await Order.create({
      products: orderProducts,
      totalPrice: totalPrice.toFixed(2),
      status: "Pending",
      user: user,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({
      message: "An error occurred while placing the order",
      error: error.message,
    });
  }
};
