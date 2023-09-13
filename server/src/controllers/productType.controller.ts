import { Request, Response } from "express";
import productTypeService from "../services/productType.service.js";
import { StatusCodes } from "../utils/constant.js";

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const productTypes = await productTypeService.getAllPopulateCategory();

    const result = productTypes.map(({ id, name, category }) => {
      return {
        id,
        name,
        category,
      };
    });

    res.status(StatusCodes.Ok200).send({ productTypes: result });
  } catch (error) {
    throw new Error((error as Error).message);
  }
  return;
};

const getByName = async (
  req: Request<{}, {}, {}, { name: string }>,
  res: Response
): Promise<void> => {
  try {
    const category = await productTypeService.getByNameAsync(req.query.name);

    res.status(StatusCodes.Ok200).send({ category });
  } catch (error) {
    throw new Error((error as Error).message);
  }
  return;
};

const add = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
    const category = await productTypeService.addAsync(req.body);

    res.status(StatusCodes.Created201).send({ category });
  } catch (error) {
    throw new Error((error as Error).message);
  }
  return;
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await productTypeService.deleteAsync(req.params.id);

    res.status(StatusCodes.Ok200).send({ category });
  } catch (error) {
    throw new Error((error as Error).message);
  }
  return;
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
    const category = await productTypeService.updateAsync(
      req.params.id,
      req.body
    );

    res.status(StatusCodes.Ok200).send({ category });
  } catch (error) {
    throw new Error((error as Error).message);
  }
  return;
};

export { getAll, getByName, add, remove, update };
