import { Model } from "mongoose";

interface IBaseService {
  getAllAsync: () => Promise<unknown>;
  getByIdAsync: (id: string) => Promise<unknown>;
  addAsync: (request: unknown) => Promise<unknown>;
  deleteAsync: (id: string) => Promise<unknown>;
}

export class BaseService<T> implements IBaseService {
  constructor(protected readonly model: typeof Model) {}

  async getAllAsync(): Promise<T[]> {
    return await this.model.find();
  }

  async getByIdAsync(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async addAsync(request: unknown): Promise<T> {
    const savedDocument = await this.model.create(request);

    await savedDocument.save();
    return savedDocument;
  }

  async deleteAsync(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }
}
