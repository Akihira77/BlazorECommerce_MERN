import productModel, { IProductModel } from "../models/product.model.js";
import { BaseService } from "./base.service.js";

class ProductService extends BaseService<IProductModel> {
  async updateAsync(
    id: string,
    request: unknown
  ): Promise<typeof this.model | null> {
    return await this.model.findByIdAndUpdate(id, { request }, { new: true });
  }
}

export default new ProductService(productModel);
