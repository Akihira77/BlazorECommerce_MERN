import productVariantModel, {
  IProductVariantModel,
} from "../models/productVariant.model.js";
import { BaseService } from "./base.service.js";

class ProductVariantService extends BaseService<IProductVariantModel> {
  async getAllVariantByProductId(
    productId: string
  ): Promise<IProductVariantModel[]> {
    return await this.model
      .find({ product: productId })
      .populate("productType");
  }
}

export default new ProductVariantService(productVariantModel);
