import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { ConnectMongoDB } from "./connection.js";
import { loginAdmin } from "./controllers/admin/auth.js";
import { checkAuthToken } from "./middlewares/auth.js";
import { productRoutesAdmin } from "./routes/admin/product.js";
import seedAdmin from "./seed/seedadmin.js";
import env from "dotenv";
import { loginUser, registerUser } from "./controllers/client/auth.js";
import {
  getAllProducts,
  getProductById,
} from "./controllers/client/product.js";
env.config();
const app = express();
const PORT = process.env.PORT || 8003;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Seeder
seedAdmin();

// DataBase
ConnectMongoDB();

// Auth & Without Token Routes
app.post("/api/admin/login", loginAdmin);
app.post("/api/user/login", loginUser);
app.post("/api/user/register", registerUser);
app.get("/api/user/product", getAllProducts);
app.get("/api/user/product/:id", getProductById);

// Admin Routes
app.use("/api/admin/products", checkAuthToken, productRoutesAdmin);
// Client Routes

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
