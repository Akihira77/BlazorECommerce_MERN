import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.error.js";
import userService from "../services/user.service.js";
import { IRequestExtends } from "../utils/express-extends.js";

type PayloadType = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
};

declare module "jsonwebtoken" {
    interface UserPayloadJwt extends jwt.JwtPayload {
        user: PayloadType;
    }
}

const authMiddleware = async (
    req: IRequestExtends,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Authentication Invalid");
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = <jwt.UserPayloadJwt>(
            jwt.verify(token, process.env.JWT_SECRET!)
        );
        const user = await userService.getByIdExcludePassword(payload.userId);

        req.user = user;
        next();
        return;
    } catch (error) {
        throw new UnauthenticatedError("Authentication Invalid");
    }
};

export default authMiddleware;
