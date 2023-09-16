import { StatusCodes } from "../utils/constant.js";
import CustomAPIError from "./custom-error.js";

class NotFoundError extends CustomAPIError {
  constructor(message: string, private statusCode: number) {
    super(message);
    this.statusCode = StatusCodes.NotFound404;
  }
}

export default NotFoundError;
