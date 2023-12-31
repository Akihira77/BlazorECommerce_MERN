import { Request, Response } from "express";
import { StatusCodes } from "../utils/constant.js";
import categoryService from "../services/category.service.js";
import productTypeService from "../services/productType.service.js";
import { IUserDTO } from "../models/user.model.js";
import { checkRole } from "../utils/check-role.js";
import { UnauthenticatedError } from "../errors/index.error.js";
import { IRequestExtends } from "../utils/express-extends.js";

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

const add = async (req: IRequestExtends, res: Response): Promise<void> => {
    const user = req.user!;
    if (checkRole(user.role, "user")) {
        throw new UnauthenticatedError(
            "User does not have the right permission"
        );
    }

    const { name, url } = req.body;
    await categoryService.addAsync({ name, url });

    res.status(StatusCodes.Created201).send({ categories: await getAndMap() });

    return;
};

const remove = async (req: IRequestExtends, res: Response): Promise<void> => {
    const user = req.user!;

    if (!checkRole(user.role, "admin")) {
        throw new UnauthenticatedError(
            "User does not have the right permission"
        );
    }

    const category = await categoryService.getByIdAsync(req.params.id);

    if (!category) {
        res.status(StatusCodes.NotFound404).send({
            msg: "Category is not found",
        });
        return;
    }

    // const productTypes = await productTypeService.getByCategoryId(category.id);

    // if (productTypes) {
    //     res.status(StatusCodes.Ok200).send({
    //         msg: "This Category still have relations with Product Type. Remove them before delete this category",
    //     });
    //     return;
    // }

    // await categoryService.deleteAsync(req.params.id);
    await categoryService.setDeletedFlag(req.params.id);

    res.status(StatusCodes.Ok200).send({ categories: await getAndMap() });

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
    await categoryService.updateAsync(req.params.id, req.body);

    res.status(StatusCodes.Ok200).send({ categories: await getAndMap() });

    return;
};

export { getAll, getByName, search, add, remove, update };
