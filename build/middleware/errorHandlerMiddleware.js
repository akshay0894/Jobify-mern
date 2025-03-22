"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log("===error");
    logger_1.default.error(err.message);
    const statusCode = err.statusCode || 500;
    const msg = err.message || 'something went wrong';
    res.status(statusCode).json({ msg });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
