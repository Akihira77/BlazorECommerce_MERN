import { Model } from "mongoose";

interface IBaseService {
    getAllAsync: () => Promise<any>;
    getByIdAsync: (id: string) => Promise<any>;
    addAsync: (request: unknown) => Promise<any>;
    deleteAsync: (id: string) => Promise<any>;
}

export class BaseService implements IBaseService {
    constructor(protected readonly model: typeof Model) {}

    async getAllAsync() {
        return await this.model.find();
    }

    async getByIdAsync(id: string) {
        return await this.model.findById(id);
    }

    async addAsync(request: unknown) {
        const savedDocument = await this.model.create(request);

        await savedDocument.save();
        return savedDocument;
    }

    async deleteAsync(id: string) {
        return await this.model.findByIdAndDelete(id);
    }
}
