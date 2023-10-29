class ErrorHandlers extends Error {
  constructor(message, statusCode) {
    super(message); // it calls the parent class(ERROR)
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandlers;
