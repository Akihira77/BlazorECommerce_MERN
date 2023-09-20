import { StatusCodes } from "../utils/constant.js";
import CustomAPIError from "./custom-error.js";

class NotFoundError extends CustomAPIError {
  private statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NotFound404;
  }
}

export default NotFoundError;
