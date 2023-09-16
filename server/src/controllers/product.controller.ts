import { Request, Response } from "express";
import productService from "../services/product.service.js";
import { StatusCodes } from "../utils/constant.js";

const getAll = async (req: Request, res: Response): Promise<void> => {
  const products = await productService.getAllAsync();

  res.status(StatusCodes.Ok200).send({ products });
  return;
};

export { getAll };
