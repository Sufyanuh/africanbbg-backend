import express from "express";
import { ConnectMongoDB } from "../connection.js";
import { loginAdmin } from "../controllers/admin/auth.js";
import seedAdmin from "../seed/seedadmin.js";
import { productRoutesAdmin } from "../routes/admin/product.js";
import { checkAuthToken } from "../middlewares/auth.js";

const app = express();
const PORT = 8003;
// MiddlesWares
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
