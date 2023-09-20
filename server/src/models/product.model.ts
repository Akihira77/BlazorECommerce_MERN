import mongoose from "mongoose";
import categoryModel from "./category.model.js";
import productVariantModel from "./productVariant.model.js";

export interface IProductModel extends mongoose.Document {
  title: string;
  description: string;
  imageUrl: string;
  category: mongoose.Schema.Types.ObjectId;
  variants: [mongoose.Schema.Types.ObjectId];
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: categoryModel,
    },
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: productVariantModel,
      },
    ],
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
