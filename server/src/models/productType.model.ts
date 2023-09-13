import mongoose from "mongoose";
import categoryModel from "./category.model.js";

export interface IProductTypeModel extends mongoose.Document {
  name: string;
  category: mongoose.Schema.Types.ObjectId;
}

const productTypeSchema = new mongoose.Schema<IProductTypeModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: categoryModel,
      required: true,
    },
  },
  { timestamps: true }
);

const productTypeModel = mongoose.model("productType", productTypeSchema);
export default productTypeModel;
