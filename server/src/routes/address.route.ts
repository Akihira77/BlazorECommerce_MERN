import express, { Router } from "express";
import * as addressController from "../controllers/address.controller.js";

const addressRoute: Router = express();

addressRoute.post("/", addressController.add);
addressRoute.get("/search", addressController.search);

addressRoute.get("/:id", addressController.getById);
addressRoute.put("/:id", addressController.update);
addressRoute.delete("/:id", addressController.remove);

export default addressRoute;
