import mongoose from "mongoose";

export interface IAddressModel extends mongoose.Document {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const addressSchema = new mongoose.Schema<IAddressModel>(
  {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zip: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const addressModel = mongoose.model("address", addressSchema);

export default addressModel;
