import errorResponse from "../utils/errorResponse.js";

export const error = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resources not found with this id.. Invalid ${err.path}`;
    err = new errorResponse(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} already exists!!`;
    err = new errorResponse(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Your url is invalid please try again letter`;
    err = new errorResponse(message, 400);
  }

  // jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `Your Url is expired please try again letter!`;
    err = new errorResponse(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message || "something went wrong:Try again later!!",
  });
};
