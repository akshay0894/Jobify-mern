"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../utils/constants");
const JobSchema = new mongoose_1.default.Schema({
    company: String,
    position: String,
    jobStatus: {
        type: String,
        enum: Object.values(constants_1.JobStatus),
        default: constants_1.JobStatus.pending
    },
    jobType: {
        type: String,
        enum: Object.values(constants_1.JobType),
        default: constants_1.JobType.fullTime
    },
    jobLocation: {
        type: String,
        default: 'my city',
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});
const JobModel = mongoose_1.default.model('job', JobSchema);
exports.default = JobModel;
