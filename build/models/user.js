"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../utils/constants");
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastName: {
        type: String,
        default: "lastName",
    },
    location: {
        type: String,
        default: "my city",
    },
    role: {
        type: String,
        enum: Object.values(constants_1.Role),
        default: constants_1.Role.user,
    },
    avatar: String,
    avatarPublicId: String,
});
UserSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj;
};
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
