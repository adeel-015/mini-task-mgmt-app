class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const response = { message: err.message || "Server Error" };
  if (process.env.NODE_ENV === "development") response.stack = err.stack;
  res.status(statusCode).json(response);
};

module.exports = { ApiError, asyncHandler, errorHandler };
