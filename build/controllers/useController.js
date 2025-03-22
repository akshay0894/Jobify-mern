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
exports.updateUser = exports.getApplicationStats = exports.getCurrentUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const job_1 = __importDefault(require("../models/job"));
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("====getcurrentUser", req);
    const user = yield user_1.default.findOne({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
    const userWithoutPassword = user === null || user === void 0 ? void 0 : user.toJSON();
    res.status(200).json({ user: userWithoutPassword });
});
exports.getCurrentUser = getCurrentUser;
const getApplicationStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.countDocuments();
    const jobs = yield job_1.default.countDocuments();
    res.status(200).json({ users, jobs });
});
exports.getApplicationStats = getApplicationStats;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const updatedUser = yield user_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId, req.body);
    res.status(200).json({ msg: 'user updated' });
});
exports.updateUser = updateUser;
