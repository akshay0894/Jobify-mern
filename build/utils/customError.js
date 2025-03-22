"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.UnauthenticatedError = exports.BadRequestError = exports.NotFoundError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthenticatedError extends CustomError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message, 403);
    }
}
exports.UnauthorizedError = UnauthorizedError;
