import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
} from "../../controllers/admin/product.js";
import { uploadSingleFile } from "../../middlewares/uploadSingleFile.js";
import { Product } from "../../models/product.js";
import { validateFields } from "../../middlewares/validateFields.js";
import { getOrders } from "../../controllers/admin/orders.js";
export const productRoutesAdmin = Router();

productRoutesAdmin
  .route("/products")
  .post(
    uploadSingleFile("image"),
    validateFields(Product, "image"),
    createProduct
  )
  .get(getProducts);

productRoutesAdmin
  .route("/products/:id")
  .get(getProductById)
  .delete(deleteProductById);
productRoutesAdmin.get("/orders", getOrders);
