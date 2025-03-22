"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JOB_SORT_BY = exports.Role = exports.JobType = exports.JobStatus = void 0;
var JobStatus;
(function (JobStatus) {
    JobStatus["interview"] = "interview";
    JobStatus["declined"] = "declined";
    JobStatus["pending"] = "pending";
})(JobStatus || (exports.JobStatus = JobStatus = {}));
var JobType;
(function (JobType) {
    JobType["fullTime"] = "full-time";
    JobType["partTime"] = "part-time";
    JobType["internship"] = "internship";
})(JobType || (exports.JobType = JobType = {}));
var Role;
(function (Role) {
    Role["user"] = "user";
    Role["admin"] = "admin";
})(Role || (exports.Role = Role = {}));
exports.JOB_SORT_BY = {
    NEWEST_FIRST: 'newest',
    OLDEST_FIRST: 'oldest',
    ASCENDING: 'a-z',
    DESCENDING: 'z-a',
};
