import express from "express";
import * as productController from "../controllers/product.controller.js";

const productRoute = express();

productRoute.get("/", productController.getAll);

export default productRoute;
