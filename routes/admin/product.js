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
export const productRoutesAdmin = Router();

productRoutesAdmin
  .route("/")
  .post(
    uploadSingleFile("image"),
    validateFields(Product, "image"),
    createProduct
  )
  .get(getProducts);

productRoutesAdmin.route("/:id").get(getProductById).delete(deleteProductById);
