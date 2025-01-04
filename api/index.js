import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ConnectMongoDB } from "../connection.js";
import { loginAdmin } from "../controllers/admin/auth.js";
import { checkAuthToken } from "../middlewares/auth.js";
import { productRoutesAdmin } from "../routes/admin/product.js";
import seedAdmin from "../seed/seedadmin.js";

const app = express();
const PORT = 8003;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // MiddlesWares
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Seeder
seedAdmin();
// DataBase
ConnectMongoDB();

// Admin Routes
app.post("/api/admin/login", loginAdmin);
app.use("/api/products", checkAuthToken, productRoutesAdmin);
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
