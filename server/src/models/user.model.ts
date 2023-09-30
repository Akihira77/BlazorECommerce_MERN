import mongoose from "mongoose";
import addressModel from "./address.model.js";

export enum RoleType {
    admin = "admin",
    operator = "operator",
    user = "user",
}

export interface IUserModel extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    // address: mongoose.Schema.Types.ObjectId;
    role: RoleType;
}

export interface IUserRegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    // address: mongoose.Schema.Types.ObjectId;
    role: RoleType;
}

export interface IUserDTO {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: RoleType;
}

const userSchema = new mongoose.Schema<IUserModel>({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [
            new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ),
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "password must be 6 or more characters"],
        // maxlength: [15, "password cannot exceed 15 characters"],
    },
    // address: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     // required: true,
    //     ref: addressModel,
    // },
    role: {
        type: String,
        enum: Object.values(RoleType),
        default: RoleType.user,
    },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
