import express, { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRoute: Router = express();

userRoute.get("/", authMiddleware, userController.getUsers);

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);

export default userRoute;
