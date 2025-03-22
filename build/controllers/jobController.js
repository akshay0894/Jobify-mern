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
exports.updateJob = exports.deleteJob = exports.getJob = exports.createJob = exports.getAllJobs = void 0;
const job_1 = __importDefault(require("../models/job"));
const logger_1 = __importDefault(require("../utils/logger"));
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(req.user);
        const jobs = yield job_1.default.find({ createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId }).populate('createdBy');
        res.status(200).json({ jobs });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json({ msg: "server error" });
    }
});
exports.getAllJobs = getAllJobs;
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { company, position } = req.body;
    try {
        req.body.createdBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const job = yield job_1.default.create(req.body);
        res.status(201).json({ job });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json({ msg: "server error" });
    }
});
exports.createJob = createJob;
const getJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const job = yield job_1.default.findById(id);
        res.status(200).json({ job });
    }
    catch (error) {
        console.log("====error");
        next(error);
    }
});
exports.getJob = getJob;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const removedJob = yield job_1.default.deleteOne({ _id: id });
    res.status(200).json({ job: removedJob });
});
exports.deleteJob = deleteJob;
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedJob = yield job_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json({ job: updatedJob });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json({ msg: "server error" });
    }
});
exports.updateJob = updateJob;
