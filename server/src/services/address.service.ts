import addressModel, { IAddressModel } from "../models/address.model.js";
import { BaseService } from "./base.service.js";

class AddressService extends BaseService<IAddressModel> {
  async searchAsync(query: Record<string, unknown>): Promise<IAddressModel[]> {
    return await this.model.find(query);
  }

  async updateAsync(
    id: string,
    request: object
  ): Promise<IAddressModel | null> {
    return await this.model.findByIdAndUpdate(id, request, { new: true });
  }
}

export default new AddressService(addressModel);
