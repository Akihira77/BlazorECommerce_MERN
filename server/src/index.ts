import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { StatusCodes } from "./utils/constant.js";
import connectDB from "./data/connectDB.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));

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
