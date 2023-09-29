import productModel, { IProductModel } from "../models/product.model.js";
import { IProductVariantModel } from "../models/productVariant.model.js";
import { BaseService } from "./base.service.js";

class ProductService extends BaseService<IProductModel> {
    async updateAsync(
        id: string,
        request: object
    ): Promise<IProductModel | null> {
        return await this.model.findByIdAndUpdate(id, request, { new: true });
    }

    async getAllPopulateCategory(): Promise<IProductModel[]> {
        return await this.model.find().populate("category");
    }

    async getByIdPopulateCategoryVariantsAndProductType(
        id: string
    ): Promise<
        | (Omit<unknown, keyof IProductModel> & IProductModel)[]
        | (Omit<any, keyof IProductModel> & IProductModel)
        | null
    > {
        return await this.model
            .findById(id)
            .populate(["category", "variants"])
            .populate({ path: "variants", populate: "productType" });
    }

    async getByIdVariants(
        productId: string
    ): Promise<
        | (Omit<unknown, keyof IProductModel> & IProductModel)[]
        | (Omit<any, keyof IProductModel> & IProductModel)
        | null
    > {
        return await this.model.findById(productId).populate("variants");
    }

    async getAllWithCategoryAndProductType(): Promise<IProductModel[]> {
        return await this.model
            .find()
            .populate(["category", "variants"])
            .populate({ path: "variants", populate: "productType" });
    }

    async addVariantForProduct(
        id: string,
        variants: IProductVariantModel[]
    ): Promise<IProductModel | null> {
        // return this.model.findById(id);
        return await this.model.findByIdAndUpdate(
            id,
            { $set: { variants: { $each: variants } } },
            { new: true }
        );
    }
}

export default new ProductService(productModel);
