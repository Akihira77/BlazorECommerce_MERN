import { Request, Response } from "express";
import { StatusCodes } from "../utils/constant.js";
import categoryService from "../services/category.service.js";

const getAndMap = async (): Promise<unknown> => {
  const categories = await categoryService.getAllAsync();

  const result = categories.map(({ _id, name, url, visible, deleted }) => {
    return {
      _id,
      name,
      url,
      visible,
      deleted,
    };
  });

  return result;
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  res.status(StatusCodes.Ok200).send({ categories: await getAndMap() });

  return;
};

const getByName = async (
  req: Request<{}, {}, {}, { name: string }>,
  res: Response
): Promise<void> => {
  const category = await categoryService.getByNameAsync(req.query.name);

  res.status(StatusCodes.Ok200).send({ category });

  return;
};

const search = async (req: Request, res: Response): Promise<void> => {
  const { name, featured, deleted, visible, searchText } = req.query;

  let queryObject = {};
  if (name) queryObject = { ...queryObject, name };
  if (featured) queryObject = { ...queryObject, featured };
  if (deleted) queryObject = { ...queryObject, deleted };
  if (visible) queryObject = { ...queryObject, visible };
  if (searchText && typeof searchText === "string") {
    queryObject = {
      ...queryObject,
      title: { $regex: new RegExp(searchText), $options: "i" },
    };
  }

  const category = await categoryService.searchAsync(queryObject);

  res.status(StatusCodes.Ok200).send({ category });

  return;
};

const add = async (req: Request, res: Response): Promise<void> => {
  await categoryService.addAsync(req.body);

  res.status(StatusCodes.Created201).send({ categories: await getAndMap() });

  return;
};

const remove = async (req: Request, res: Response): Promise<void> => {
  await categoryService.deleteAsync(req.params.id);

  res.status(StatusCodes.Ok200).send({ categories: await getAndMap() });

  return;
};

const update = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  await categoryService.updateAsync(req.params.id, req.body);

  res.status(StatusCodes.Ok200).send({ categories: await getAndMap() });

  return;
};

export { getAll, getByName, search, add, remove, update };
