import express from "express";
import * as categoryController from "../controllers/category.controller.js";

const categoryRoute = express();

categoryRoute.get("/", categoryController.getAll);
categoryRoute.post("/", categoryController.add);

categoryRoute.delete("/:id", categoryController.remove);
categoryRoute.put("/:id", categoryController.update);

categoryRoute.get("/search", categoryController.search);

export default categoryRoute;
