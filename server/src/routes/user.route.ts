import express, { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const userRoute: Router = express();

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);

export default userRoute;
