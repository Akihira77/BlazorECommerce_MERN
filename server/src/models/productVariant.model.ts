import mongoose from "mongoose";
import productTypeModel from "./productType.model.js";

export interface IProductVariantModel extends mongoose.Document {
  productType: mongoose.Schema.Types.ObjectId;
  price: number;
  originalPrice: number;
  visible: boolean;
  deleted: boolean;
}

const productVariantSchema = new mongoose.Schema<IProductVariantModel>(
  {
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: productTypeModel,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const productVariantModel = mongoose.model(
  "productVariant",
  productVariantSchema
);

export default productVariantModel;
