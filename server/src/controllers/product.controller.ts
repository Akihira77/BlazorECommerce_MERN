import { Request, Response } from "express";
import productService from "../services/product.service.js";
import { StatusCodes } from "../utils/constant.js";

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.getAllAsync();

    res.status(StatusCodes.Ok200).send({ products });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(StatusCodes.BadRequest400).send({ msg: error.message });
      return;
    }

    res.status(StatusCodes.InternalServerError500);
  }
  return;
};

export { getAll };
