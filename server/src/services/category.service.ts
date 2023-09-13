import { ICategoryModel } from "./../models/category.model";
import categoryModel from "../models/category.model.js";
import { BaseService } from "./base.service.js";

class CategoryService extends BaseService<ICategoryModel> {
  async getByNameAsync(name: string): Promise<typeof this.model | null> {
    return await this.model.findOne({ name });
  }

  async updateAsync(
    id: string,
    request: object
  ): Promise<typeof this.model | null> {
    return await this.model.findByIdAndUpdate(id, request, { new: true });
  }

  async searchAsync(
    query: Record<string, unknown>
  ): Promise<(typeof this.model)[]> {
    return await this.model.find(query);
  }
}

export default new CategoryService(categoryModel);
