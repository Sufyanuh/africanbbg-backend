import { Product } from "../../models/product.js";
import fs from "fs";

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
  const { name, description, price, quantity } = req.body;
  const image = req.file;

  if (!name || !description || !price || !quantity || !image) {
    fs.unlink(image.path, (error) => console.log(error));
    return res.status(400).json({ message: "Validation Error" });
  }

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      quantity,
      image: image.path,
    });

    res.status(201).json({
      response: newProduct,
      message: "Product created successfully !",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error," });
  }
};
