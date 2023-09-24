import express, { Router } from "express";
import * as productController from "../controllers/product.controller.js";

const productRoute: Router = express();

productRoute.get("/", productController.getAllPopulateVariant);
productRoute.post("/", productController.add);

productRoute.get("/:id", productController.getById);
productRoute.delete("/:id", productController.remove);

productRoute.post("/add-variant", productController.addVariantToProduct);

export default productRoute;
