import { StatusCodes } from "../utils/constant.js";
import CustomAPIError from "./custom-error.js";

class UnauthenticatedError extends CustomAPIError {
  private statusCode: number;
  constructor(override message: string) {
    super(message);
    this.statusCode = StatusCodes.Unauthorized401;
  }
}

export default UnauthenticatedError;
