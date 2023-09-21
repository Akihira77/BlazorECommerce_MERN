import { Request, Response } from "express";
import productTypeService from "../services/productType.service.js";
import { StatusCodes } from "../utils/constant.js";

const getAndMap = async (): Promise<unknown> => {
  const productTypes = await productTypeService.getAllPopulateCategory();

  const result: unknown = productTypes.map(({ id, name, category }) => {
    return {
      id,
      name,
      category,
    };
  });

  return result;
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  res.status(StatusCodes.Ok200).send({ productTypes: await getAndMap() });
  return;
};

const getByName = async (
  req: Request<{}, {}, {}, { name: string }>,
  res: Response
): Promise<void> => {
  const category = await productTypeService.getByNameAsync(req.query.name);

  res.status(StatusCodes.Ok200).send({ category });
  return;
};

const add = async (req: Request, res: Response): Promise<void> => {
  await productTypeService.addAsync(req.body);

  res.status(StatusCodes.Created201).send({ productTypes: await getAndMap() });
  return;
};

const remove = async (req: Request, res: Response): Promise<void> => {
  await productTypeService.deleteAsync(req.params.id);

  res.status(StatusCodes.Ok200).send({ productTypes: await getAndMap() });
  return;
};

const update = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  await productTypeService.updateAsync(req.params.id, req.body);

  res.status(StatusCodes.Ok200).send({ productTypes: await getAndMap() });
  return;
};

export { getAll, getByName, add, remove, update };
