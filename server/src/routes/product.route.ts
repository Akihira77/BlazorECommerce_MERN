import express, { NextFunction, Response, Router } from "express";
import * as productController from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { IRequestExtends } from "../utils/express-extends.js";

const productRoute: Router = express();

const setAuthMid = (req: IRequestExtends, res: Response, next: NextFunction) =>
    authMiddleware(req, res, next);

productRoute.get("/", productController.getAllPopulateVariant);
productRoute.post("/", setAuthMid, productController.add);

productRoute.get("/:id", productController.getById);
productRoute.delete("/:id", setAuthMid, productController.remove);
productRoute.put("/:id", setAuthMid, productController.update);

productRoute.post(
    "/add-variant",
    setAuthMid,
    productController.addVariantToProduct
);

export default productRoute;
