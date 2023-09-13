import { Request, Response } from "express";
import { StatusCodes } from "../utils/constant.js";
import categoryService from "../services/category.service.js";

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await categoryService.getAllAsync();

    const result = categories.map(({ id, name, url, visible, deleted }) => {
      return {
        id,
        name,
        url,
        visible,
        deleted,
      };
    });
    res.status(StatusCodes.Ok200).send({ categories: result });
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
    const category = await categoryService.getByNameAsync(req.query.name);

    res.status(StatusCodes.Ok200).send({ category });
  } catch (error) {
    throw new Error((error as Error).message);
  }
  return;
};

const search = async (req: Request, res: Response): Promise<void> => {
  try {
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
  } catch (error) {
    throw new Error((error as Error).message);
  }
  return;
};

const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await categoryService.addAsync(req.body);

    res.status(StatusCodes.Created201).send({ category });
  } catch (error) {
    throw new Error((error as Error).message);
  }
  return;
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await categoryService.deleteAsync(req.params.id);

    res.status(StatusCodes.Ok200).send({ category });
  } catch (error) {
    throw new Error((error as Error).message);
  }
  return;
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
    const category = await categoryService.updateAsync(req.params.id, req.body);

    res.status(StatusCodes.Ok200).send({ category });
  } catch (error) {
    throw new Error((error as Error).message);
  }
  return;
};

export { getAll, getByName, search, add, remove, update };
