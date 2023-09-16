import { StatusCodes } from "../utils/constant.js";
import CustomAPIError from "./custom-error.js";

class BadRequestError extends CustomAPIError {
  private statusCode: number;
  constructor(override message: string) {
    super(message);
    this.statusCode = StatusCodes.BadRequest400;
  }
}

export default BadRequestError;
