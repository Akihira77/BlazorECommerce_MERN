import userModel, { IUserModel } from "../models/user.model.js";
import { BaseService } from "./base.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/index.error.js";

class UserService extends BaseService<IUserModel> {
  async register(request: IUserModel): Promise<IUserModel> {
    const salt = await bcrypt.genSalt(10);
    request.password = await bcrypt.hash(request.password, salt);

    const savedAccount = await this.model.create(request);

    await savedAccount.save();
    return savedAccount;
  }

  async getByEmail(email: string): Promise<IUserModel | null> {
    return await this.model.findOne({ email });
  }

  async createJWT(request: IUserModel) {
    return jwt.sign(
      {
        userId: request.id,
        userName: `${request.firstName} ${request.lastName}`,
        role: "non-admin",
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
  }
}

export default new UserService(userModel);
