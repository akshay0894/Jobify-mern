"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobRouter_1 = __importDefault(require("../routers/jobRouter"));
const authRouter_1 = __importDefault(require("../routers/authRouter"));
const userRouter_1 = __importDefault(require("../routers/userRouter"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandlerMiddleware_1 = require("../middleware/errorHandlerMiddleware");
const authMiddleware_1 = require("../middleware/authMiddleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
function createServer() {
    const app = (0, express_1.default)();
    if (process.env.NODE_ENV === "development") {
        app.use((0, morgan_1.default)("dev"));
    }
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "public")));
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.get("/api/v1/test", (req, res) => {
        res.json({ msg: "test route" });
    });
    app.use("/api/v1/jobs", authMiddleware_1.authenticateUser, jobRouter_1.default);
    app.use("/api/v1/auth", authRouter_1.default);
    app.use("/api/v1/users", authMiddleware_1.authenticateUser, userRouter_1.default);
    app.use("*", (req, res) => {
        res.status(404).json({ msg: "not found" });
    });
    app.use(errorHandlerMiddleware_1.errorHandlerMiddleware);
    return app;
}
exports.default = createServer;
