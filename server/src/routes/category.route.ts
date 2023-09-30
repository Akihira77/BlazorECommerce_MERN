import express, { Router } from "express";
import * as categoryController from "../controllers/category.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const categoryRoute: Router = express();

categoryRoute.get("/", categoryController.getAll);
categoryRoute.post("/", authMiddleware, categoryController.add);
categoryRoute.get("/search", categoryController.search);

categoryRoute.delete("/:id", authMiddleware, categoryController.remove);
categoryRoute.put("/:id", authMiddleware, categoryController.update);

export default categoryRoute;
