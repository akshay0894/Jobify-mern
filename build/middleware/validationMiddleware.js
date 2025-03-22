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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUserInput = exports.validateLoginInput = exports.validateRegisterInput = exports.validateIdJob = exports.validateIdParam = exports.validateJobInput = void 0;
const express_validator_1 = require("express-validator");
const customError_1 = require("../utils/customError");
const constants_1 = require("../utils/constants");
const mongoose_1 = __importDefault(require("mongoose"));
const job_1 = __importDefault(require("../models/job"));
const user_1 = __importDefault(require("../models/user"));
const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors
                    .array()
                    .map((error) => error.msg)
                    .join(",");
                if (errorMessages.startsWith("no job")) {
                    throw new customError_1.NotFoundError(errorMessages);
                }
                if (errorMessages[0].startsWith("not authorized")) {
                    throw new customError_1.UnauthorizedError("not authorized to access this route");
                }
                throw new customError_1.BadRequestError(errorMessages);
            }
            next();
        },
    ];
};
exports.validateJobInput = withValidationErrors([
    (0, express_validator_1.body)("company").notEmpty().withMessage("company is required"),
    (0, express_validator_1.body)("position").notEmpty().withMessage("position is required"),
    (0, express_validator_1.body)("jobLocation").notEmpty().withMessage("job location is required"),
    (0, express_validator_1.body)("jobStatus")
        .isIn(Object.values(constants_1.JobStatus))
        .withMessage("invalid status value"),
    (0, express_validator_1.body)("jobType").isIn(Object.values(constants_1.JobType)).withMessage("invalid job type"),
]);
exports.validateIdParam = withValidationErrors([
    (0, express_validator_1.param)("id")
        .custom((value) => mongoose_1.default.Types.ObjectId.isValid(value))
        .withMessage("invalid MongoDB id"),
]);
exports.validateIdJob = withValidationErrors([
    (0, express_validator_1.param)("id").custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(value);
        if (!isValid)
            throw new customError_1.BadRequestError("invalid MongoDB id");
        const job = yield job_1.default.findById(value);
        if (!job)
            throw new customError_1.NotFoundError(`no job with id : ${value}`);
        const isAdmin = req.user.role === "admin";
        const isOwner = req.user.userId === job.createdBy.toString();
        if (!isAdmin && !isOwner) {
            throw new customError_1.UnauthorizedError("not authorized to access this route");
        }
    })),
]);
exports.validateRegisterInput = withValidationErrors([
    (0, express_validator_1.body)("name").notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email format")
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ email });
        if (user) {
            throw new customError_1.BadRequestError("email already exists");
        }
    })),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password must be at least 8 characters long"),
    (0, express_validator_1.body)("location").notEmpty().withMessage("location is required"),
    (0, express_validator_1.body)("lastName").notEmpty().withMessage("last name is required"),
]);
exports.validateLoginInput = withValidationErrors([
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email format"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("password is required"),
]);
exports.validateUpdateUserInput = withValidationErrors([
    (0, express_validator_1.body)('name').notEmpty().withMessage('name is required'),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom((email_1, _a) => __awaiter(void 0, [email_1, _a], void 0, function* (email, { req }) {
        const user = yield user_1.default.findOne({ email });
        if (user && user._id.toString() !== req.user.userId) {
            throw new Error('email already exists');
        }
    })),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage('last name is required'),
    (0, express_validator_1.body)('location').notEmpty().withMessage('location is required'),
]);
