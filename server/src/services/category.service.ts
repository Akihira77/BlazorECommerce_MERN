import categoryModel from "../models/category.model.js";
import { BaseService } from "./base.service.js";

class CategoryService extends BaseService {
    async getByNameAsync(name: string) {
        return await this.model.findOne({ name });
    }

    async updateAsync(id: string, request: unknown) {
        return await this.model.findByIdAndUpdate(
            id,
            { request },
            { new: true }
        );
    }

    async searchAsync(query: Record<string, unknown>) {
        return await this.model.find(query);
    }
}

export default new CategoryService(categoryModel);
