"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForTestUser = exports.authorizePermissions = exports.authenticateUser = void 0;
const customError_1 = require("../utils/customError");
const tokenUtils_1 = require("../utils/tokenUtils");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token) {
        return next(new customError_1.UnauthenticatedError("authentication failed"));
    }
    try {
        const { userId, role } = (0, tokenUtils_1.verifyJWT)(token);
        const testUser = userId === "67b21cffbb3f239db713cedf";
        req.user = { userId, role, testUser };
        next();
    }
    catch (error) {
        return next(new customError_1.UnauthenticatedError("authentication failed"));
    }
});
exports.authenticateUser = authenticateUser;
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        var _a;
        if (!roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)) {
            throw new customError_1.UnauthorizedError("Unauthorized to access this route");
        }
        next();
    };
};
exports.authorizePermissions = authorizePermissions;
const checkForTestUser = (req, res, next) => {
    var _a;
    if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.testUser) {
        return next(new customError_1.BadRequestError("Demo User. Read Only!"));
    }
    next();
};
exports.checkForTestUser = checkForTestUser;
