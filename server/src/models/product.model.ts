import mongoose from "mongoose";

export interface IProductModel {
    title: string;
    description: string;
    imageUrl: string;
    featured: boolean;
    visible: boolean;
    deleted: boolean;
}

const productSchema = new mongoose.Schema<IProductModel>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        imageUrl: {
            type: String,
            required: true,
            trim: true,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        visible: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);
export default productModel;
