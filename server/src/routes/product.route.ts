import express, { Router } from "express";
import * as productController from "../controllers/product.controller.js";

const productRoute: Router = express();

productRoute.get("/", productController.getAll);

export default productRoute;
