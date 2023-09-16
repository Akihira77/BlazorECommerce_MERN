import "dotenv/config";
import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { StatusCodes } from "./utils/constant.js";
import connectDB from "./data/connectDB.js";
import categoryRoute from "./routes/category.route.js";
import productRoute from "./routes/product.route.js";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.js";
import productTypeRoute from "./routes/productType.route.js";
import addressRoute from "./routes/address.route.js";
import userRoute from "./routes/user.route.js";

const app: Application = express();

//! Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//! Routes
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/product-type", productTypeRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/user", userRoute);

//! Error Handler Middleware
app.use(errorHandlerMiddleware);

//! NotFound Route
app.get("/*", (req, res) => {
  return res
    .status(StatusCodes.NotFound404)
    .send({ msg: "Route does not match anything in the server" });
});

const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

connectDB().then(() => startServer());
