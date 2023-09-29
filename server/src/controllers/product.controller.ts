import { Request, Response } from "express";
import productService from "../services/product.service.js";
import { StatusCodes } from "../utils/constant.js";
import BadRequestError from "../errors/bad-request.js";
import productVariantService from "../services/productVariant.service.js";
import NotFoundError from "../errors/not-found.js";
import productTypeService from "../services/productType.service.js";
import { IProductModel } from "../models/product.model.js";

const getAll = async (req: Request, res: Response): Promise<void> => {
    const products = await productService.getAllAsync();

    res.status(StatusCodes.Ok200).send({ products });
    return;
};

const getAllPopulateVariant = async (
    req: Request,
    res: Response
): Promise<void> => {
    const products = await productService.getAllWithCategoryAndProductType();

    res.status(StatusCodes.Ok200).send({ products });
    return;
};

const add = async (req: Request, res: Response): Promise<void> => {
    const {
        // title,
        // description,
        // imageUrl,
        // category,
        // featured,
        // visible,
        // deleted,
        variants,
    } = req.body;

    const variantsTemp = variants.map((variant: Record<string, any>) => ({
        productType: variant.productType._id,
        price: variant.price,
        originalPrice: variant.originalPrice,
        visible: variant.visible,
        deleted: variant.deleted,
    }));

    const savedVariants = await productVariantService.insertManyAsync(
        variantsTemp
    );

    req.body.variants = Object.values(savedVariants);

    // const request = {
    //     title,
    //     description,
    //     imageUrl,
    //     category,
    //     featured,
    //     visible,
    //     deleted,
    //     variants: Object.values(savedVariants),
    // };

    await productService.addAsync(req.body);

    res.status(StatusCodes.Created201).send({
        msg: "Creating product success",
    });
    return;
};

const addVariantToProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { productId, variant } = req.body;
    if (!productId || !variant) {
        throw new BadRequestError("Please provide productId and product type");
    }

    const savedVariant = await productVariantService.addAsync(variant);

    console.log(savedVariant);
    const product = await productService.addVariantForProduct(productId, [
        savedVariant,
    ]);

    res.status(StatusCodes.Ok200).send({ msg: "success adding", product });
    return;
};

const getById = async (req: Request, res: Response) => {
    const product =
        await productService.getByIdPopulateCategoryVariantsAndProductType(
            req.params.id
        );

    if (!product) {
        throw new NotFoundError("Product is not found");
    }

    res.status(StatusCodes.Ok200).send({ product });
    return;
};

const remove = async (req: Request, res: Response) => {
    const product: IProductModel | null = await productService.getByIdAsync(
        req.params.id
    );

    if (!product) {
        throw new NotFoundError("Product does not found");
    }

    product.deleted = true;
    await product?.save();
    // await productService.deleteAsync(req.params.id);

    // const deletedCount = await productVariantService.removeProductVariants(
    //     product.variants
    // );

    res.status(StatusCodes.Ok200).send({
        msg: "Deleting success",
        product,
        // deletedCount,
    });
    return;
};

const update = async (req: Request, res: Response) => {
    const product = await productService.getByIdAsync(req.params.id);

    if (!product) {
        throw new NotFoundError("Product is not found");
    }

    await productVariantService.removeProductVariants(product?.variants);

    const { variants } = req.body;
    const variantsTemp = variants.map((variant: Record<string, any>) => ({
        productType: variant.productType._id,
        price: variant.price,
        originalPrice: variant.originalPrice,
        visible: variant.visible,
        deleted: variant.deleted,
    }));

    const savedVariants = await productVariantService.insertManyAsync(
        variantsTemp
    );

    req.body.variants = Object.values(savedVariants);
    console.log(req.body);
    await productService.addVariantForProduct(req.params.id, req.body.variants);
    const result = await productService.updateAsync(req.params.id, req.body);

    // console.log(result);
    res.status(StatusCodes.Ok200).send({
        msg: "Updating success",
        product: result,
    });
    return;
};

export {
    getAll,
    getAllPopulateVariant,
    add,
    addVariantToProduct,
    getById,
    remove,
    update,
};
