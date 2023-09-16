import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../utils/constant.js";
import CustomAPIError from "../errors/custom-error.js";

type CustomErrorTypes = {
  statusCode: number;
  msg: string;
};

const errorHandlerMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let customError: CustomErrorTypes = {
    statusCode: err.statusCode || StatusCodes.InternalServerError500,
    msg: err.message || "Something went wrong. Try again later",
  };

  switch (true) {
    case err.code === 11000: {
      customError = {
        statusCode: StatusCodes.BadRequest400,
        msg: `Duplicate value entered for ${Object.keys(
          err.keyValue
        )} field. Please choose another value`,
      };
      break;
    }

    case err.name === "ValidationError": {
      customError = {
        statusCode: StatusCodes.BadRequest400,
        msg: Object.values(err.errors)
          .map((item: any) => item.message)
          .join(","),
      };
      break;
    }

    case err.name === "CastError": {
      customError = {
        statusCode: StatusCodes.NotFound404,
        msg: `No item found with id : ${err.value}`,
      };
      break;
    }

    default: {
      break;
    }
  }

  res.status(customError.statusCode).send({ msg: customError.msg });
  return;
};

export default errorHandlerMiddleware;
