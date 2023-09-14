import express, { Router } from "express";
import * as productTypeController from "../controllers/productType.controller.js";

const productTypeRoute: Router = express();

productTypeRoute.get("/", productTypeController.getAll);
productTypeRoute.post("/", productTypeController.add);

productTypeRoute.get("/name", productTypeController.getByName);

productTypeRoute.put("/:id", productTypeController.update);
productTypeRoute.delete("/:id", productTypeController.remove);

export default productTypeRoute;
