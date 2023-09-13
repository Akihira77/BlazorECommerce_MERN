import mongoose from "mongoose";

export interface ICategoryModel extends mongoose.Document {
  name: string;
  url: string;
  visible: boolean;
  deleted: boolean;
}

const categorySchema = new mongoose.Schema<ICategoryModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
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

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
