import mongoose from "mongoose";

interface IBaseService {
  getAllAsync: () => Promise<unknown>;
  getByIdAsync: (id: string) => Promise<unknown>;
  addAsync: (request: unknown) => Promise<unknown>;
  deleteAsync: (id: string) => Promise<unknown>;
}

export class BaseService<T> implements IBaseService {
  constructor(protected readonly model: typeof mongoose.Model) {}

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

  async insertManyAsync(
    request: unknown
  ): Promise<{ [key: number]: mongoose.Types.ObjectId }> {
    const savedDocuments = await this.model.insertMany(request, {
      rawResult: true,
    });

    return savedDocuments.insertedIds;
  }

  async deleteAsync(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async convertStringToObjectId(id: string): Promise<mongoose.Types.ObjectId> {
    return new mongoose.Types.ObjectId(id);
  }
}
