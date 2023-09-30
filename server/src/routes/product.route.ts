import express, { NextFunction, Response, Router } from "express";
import * as productController from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { IRequestExtends } from "../utils/express-extends.js";

const productRoute: Router = express();

productRoute.get("/", productController.getAllPopulateVariant);
productRoute.post("/", authMiddleware, productController.add);

productRoute.get("/:id", productController.getById);
productRoute.delete("/:id", authMiddleware, productController.remove);
productRoute.put("/:id", authMiddleware, productController.update);

productRoute.post(
    "/add-variant",
    authMiddleware,
    productController.addVariantToProduct
);

export default productRoute;
