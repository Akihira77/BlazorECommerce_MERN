import { Request } from "express";
import { IUserDTO } from "../models/user.model.js";

export interface IRequestExtends extends Request {
    user?: IUserDTO;
}
