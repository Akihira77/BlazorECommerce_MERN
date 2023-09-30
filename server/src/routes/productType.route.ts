import express, { NextFunction, Response, Router } from "express";
import * as productTypeController from "../controllers/productType.controller.js";
import { IRequestExtends } from "../utils/express-extends.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const productTypeRoute: Router = express();

productTypeRoute.get("/", productTypeController.getAll);
productTypeRoute.post("/", authMiddleware, productTypeController.add);

productTypeRoute.get("/name", productTypeController.getByName);

productTypeRoute.put("/:id", authMiddleware, productTypeController.update);
productTypeRoute.delete("/:id", authMiddleware, productTypeController.remove);

export default productTypeRoute;
