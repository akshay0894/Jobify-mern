export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}
export class UnauthenticatedError extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}
