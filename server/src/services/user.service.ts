import userModel, {
    IUserDTO,
    IUserModel,
    IUserRegisterDto,
} from "../models/user.model.js";
import { BaseService } from "./base.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService extends BaseService<IUserModel> {
    async register(request: IUserRegisterDto): Promise<IUserModel> {
        const salt = await bcrypt.genSalt(10);
        request.password = await bcrypt.hash(request.password, salt);

        const savedAccount = await this.model.create(request);

        await savedAccount.save();
        return savedAccount;
    }

    async getByEmail(email: string): Promise<IUserModel | null> {
        return await this.model.findOne({ email });
    }

    async getByIdExcludePassword(userId: string): Promise<IUserDTO> {
        const result = (await this.model.findById(userId).select({
            _id: 1,
            email: 1,
            firstName: 1,
            lastName: 1,
            role: 1,
        })) as IUserDTO;

        return result;
    }
    async createJWT(request: IUserModel) {
        return jwt.sign(
            {
                userId: request.id,
                userName: `${request.firstName} ${request.lastName}`,
                role: request.role,
                email: request.email,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );
    }
}

export default new UserService(userModel);
