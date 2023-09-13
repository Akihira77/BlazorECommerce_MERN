import productTypeModel, {
  IProductTypeModel,
} from "./../models/productType.model.js";
import { BaseService } from "./base.service.js";

class ProductTypeService extends BaseService<IProductTypeModel> {
  async updateAsync(
    id: string,
    request: object
  ): Promise<IProductTypeModel | null> {
    return await this.model.findByIdAndUpdate(id, request, { new: true });
  }

  async getAllPopulateCategory(): Promise<IProductTypeModel[]> {
    return await this.model.find().populate("category");
  }

  async getByNameAsync(name: string): Promise<IProductTypeModel | null> {
    return await this.model.findOne({ name });
  }
}

export default new ProductTypeService(productTypeModel);
