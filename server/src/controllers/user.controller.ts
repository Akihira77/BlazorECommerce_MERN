import { Request, Response } from "express";
import userService from "../services/user.service.js";
import { StatusCodes } from "../utils/constant.js";
import bcrypt from "bcryptjs";
import { BadRequestError, NotFoundError } from "../errors/index.error.js";

const register = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
        throw new BadRequestError(
            "Password and Confirm Password must be provided"
        );
    }

    if (password.length < 6) {
        throw new BadRequestError("password must be 6 or more characters");
    }

    if (password !== confirmPassword) {
        throw new BadRequestError(
            "password and confirm password does not match"
        );
    }

    const user = await userService.register(req.body);
    const token = await userService.createJWT(user);

    res.status(StatusCodes.Created201).send({ user, token });
    return;
};

const login = async (req: Request, res: Response): Promise<void> => {
    const user = await userService.getByEmail(req.body.email);
    if (!user) {
        throw new NotFoundError("User not found");
    }

    const isMatch: boolean = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (isMatch) {
        res.status(StatusCodes.Ok200).send({
            user: {
                userId: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },

            token: await userService.createJWT(user),
        });
        return;
    }

    throw new BadRequestError("Invalid credentials");
};

export { register, login };
