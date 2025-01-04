import { Product } from "../../models/product.js";
import fs from "fs/promises";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res
      .status(200)
      .json({ message: "Success", response: products, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Success", response: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Success", response: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const image = req.file.path;

    const newProduct = await Product.create({
      name,
      description,
      price,
      quantity,
      image,
    });

    res
      .status(201)
      .json({ message: "Product created successfully!", product: newProduct });
  } catch (err) {
    console.error("Error creating product:", err.message);

    // Delete file in case of error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (error) {
        console.error("Error deleting uploaded file:", error.message);
      }
    }

    res.status(500).json({ message: "Server error", error: err.message });
  }
};
