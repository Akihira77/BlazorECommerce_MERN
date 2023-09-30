import { Request, Response } from "express";
import productTypeService from "../services/productType.service.js";
import { StatusCodes } from "../utils/constant.js";
import { IRequestExtends } from "../utils/express-extends.js";
import { checkRole } from "../utils/check-role.js";
import { UnauthenticatedError } from "../errors/index.error.js";

const getAndMap = async (): Promise<unknown> => {
    const productTypes = await productTypeService.getAllPopulateCategory();

    const result: unknown = productTypes.map(({ _id, name, category }) => {
        return {
            _id,
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

const add = async (req: IRequestExtends, res: Response): Promise<void> => {
    const user = req.user!;
    if (checkRole(user.role, "user")) {
        throw new UnauthenticatedError(
            "User does not have the right permission"
        );
    }
    await productTypeService.addAsync(req.body);

    res.status(StatusCodes.Created201).send({
        productTypes: await getAndMap(),
    });
    return;
};

const remove = async (req: IRequestExtends, res: Response): Promise<void> => {
    const user = req.user!;
    if (!checkRole(user.role, "admin")) {
        throw new UnauthenticatedError(
            "User does not have the right permission"
        );
    }

    await productTypeService.deleteAsync(req.params.id);

    res.status(StatusCodes.Ok200).send({ productTypes: await getAndMap() });
    return;
};

const update = async (req: IRequestExtends, res: Response): Promise<void> => {
    // console.log(req.body);
    const user = req.user!;
    if (checkRole(user.role, "user")) {
        throw new UnauthenticatedError(
            "User does not have the right permission"
        );
    }
    await productTypeService.updateAsync(req.params.id, req.body);

    res.status(StatusCodes.Ok200).send({ productTypes: await getAndMap() });
    return;
};

export { getAll, getByName, add, remove, update };
