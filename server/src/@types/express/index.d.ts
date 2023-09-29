import { IUserDTO } from "../models/user.model.js";

export {};

declare global {
    namespace Express {
        interface Request {
            user?: IUserDTO;
        }
    }
}
