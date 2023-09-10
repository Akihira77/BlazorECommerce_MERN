import productModel from "../models/product.model.js";
import { BaseService } from "./base.service.js";

class ProductService extends BaseService {
    async updateAsync(id: string, request: unknown) {
        return await this.model.findByIdAndUpdate(
            id,
            { request },
            { new: true }
        );
    }
}

export default new ProductService(productModel);
