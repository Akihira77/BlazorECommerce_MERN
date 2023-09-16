import { Request, Response } from "express";
import addressService from "../services/address.service.js";
import { StatusCodes } from "../utils/constant.js";

const search = async (req: Request, res: Response): Promise<void> => {
  function mapObject(
    objName: string,
    objValue: unknown,
    objQuery: Record<string, unknown>
  ) {
    if (typeof objValue === "string") {
      return {
        ...objQuery,
        [objName]: { $regex: new RegExp(objValue), $options: "i" },
      };
    }

    return objQuery;
  }
  const { street, city, country, state } = req.query;

  let queryObject: Record<string, unknown> = {};

  if (street) queryObject = mapObject("street", street, queryObject);
  if (city) queryObject = mapObject("city", city, queryObject);
  if (country) queryObject = mapObject("country", country, queryObject);
  if (state) queryObject = mapObject("state", state, queryObject);

  const address = await addressService.searchAsync(queryObject);

  res.status(StatusCodes.Ok200).send({ address });

  return;
};

const getById = async (req: Request, res: Response): Promise<void> => {
  return;
};

const add = async (req: Request, res: Response): Promise<void> => {
  const address = await addressService.addAsync(req.body);

  res.status(StatusCodes.Created201).send({ address });
  return;
};

const remove = async (req: Request, res: Response): Promise<void> => {
  const address = await addressService.deleteAsync(req.params.id);

  res.status(StatusCodes.Ok200).send({ address });
  return;
};

const update = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  const address = await addressService.updateAsync(req.params.id, req.body);

  res.status(StatusCodes.Ok200).send({ address });
  return;
};

export { search, add, remove, update, getById };
