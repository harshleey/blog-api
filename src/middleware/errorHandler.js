import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/custom-error.js";

function errorHandler(err, req, res, next) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal server error" });
}

export { errorHandler };
