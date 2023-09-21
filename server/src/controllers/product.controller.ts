import { Request, Response } from "express";
import productService from "../services/product.service.js";
import { StatusCodes } from "../utils/constant.js";
import BadRequestError from "../errors/bad-request.js";
import productVariantService from "../services/productVariant.service.js";
import NotFoundError from "../errors/not-found.js";
import productTypeService from "../services/productType.service.js";

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
    title,
    description,
    imageUrl,
    category,
    featured,
    visible,
    deleted,
    variants,
  } = req.body;

  // console.log(req.body);
  const variantsTemp = variants.map((variant: any) => ({
    productType: variant.productType.id,
    price: variant.price,
    originalPrice: variant.originalPrice,
    visible: variant.visible,
    deleted: variant.deleted,
  }));

  const savedVariants = await productVariantService.insertManyAsync(
    variantsTemp
  );

  console.log(Object.values(savedVariants));

  const request = {
    title,
    description,
    imageUrl,
    category,
    featured,
    visible,
    deleted,
    variants: Object.values(savedVariants),
  };

  await productService.addAsync(request);

  res.status(StatusCodes.Created201).send({ msg: "Creating product success" });
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
  const product = await productService.addVariantForProduct(
    productId,
    savedVariant
  );

  res.status(StatusCodes.Ok200).send({ msg: "success adding", product });
  return;
};

export { getAll, getAllPopulateVariant, add, addVariantToProduct };
