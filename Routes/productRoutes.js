import { Router } from "express";
import auth from "../Middlewares/auth.js";
import productController from "../Controller/productController.js";

const productRoutes = Router();
const Product = new productController;

productRoutes.post("/addProduct",auth, (req,res) => Product.createProduct(req,res));
productRoutes.get("/allProducts",auth, (req,res) => Product.getAll(req,res));
productRoutes.get("/allProducts/:sort", auth, (req,res) => Product.sortingProducts(req,res));
productRoutes.get("/Products/:pages", auth, (req,res) => Product.pagination(req,res));

export default productRoutes;