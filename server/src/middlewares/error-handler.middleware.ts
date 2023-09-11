import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../utils/constant.js";

type ErrorType = Error;
const errorHandlerMiddleware = async (
    err: ErrorType,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    switch (true) {
        // case err instanceof Error: {
        //     res.status(StatusCodes.BadRequest400).send({ msg: err.message });
        //     break;
        // }

        default: {
            res.status(StatusCodes.BadRequest400).send({
                msg: err.message,
            });
            break;
        }
    }
};

export default errorHandlerMiddleware;
