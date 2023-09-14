import express, { Router } from "express";
import * as categoryController from "../controllers/category.controller.js";

const categoryRoute: Router = express();

categoryRoute.get("/", categoryController.getAll);
categoryRoute.post("/", categoryController.add);
categoryRoute.get("/search", categoryController.search);

categoryRoute.delete("/:id", categoryController.remove);
categoryRoute.put("/:id", categoryController.update);

export default categoryRoute;
