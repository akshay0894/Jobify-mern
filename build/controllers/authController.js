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
exports.logout = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const passwordUtils_1 = require("../utils/passwordUtils");
const customError_1 = require("../utils/customError");
const tokenUtils_1 = require("../utils/tokenUtils");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isFirstAccount = (yield user_1.default.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
    const hashedPassword = yield (0, passwordUtils_1.hashPassword)(req.body.password);
    req.body.password = hashedPassword;
    const user = yield user_1.default.create(req.body);
    res.status(201).send({ msg: 'user created successfully' });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("===login", exports.login);
    const user = yield user_1.default.findOne({ email: req.body.email });
    const isValidUser = user && (yield (0, passwordUtils_1.comparePassword)(req.body.password, user.password));
    if (!isValidUser)
        throw new customError_1.UnauthenticatedError('invalid credentials');
    const token = (0, tokenUtils_1.createJWT)({ userId: user._id, role: user.role });
    const oneDay = 1000 * 60 * 60 * 24;
    console.log(token, new Date(Date.now() + oneDay));
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).send({ msg: 'login successfully' });
});
exports.login = login;
const logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(200).json({ msg: 'user logged out!' });
};
exports.logout = logout;
