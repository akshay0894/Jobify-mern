import  mongoose  from "mongoose";
import { JobStatus, JobType } from "../utils/constants";

export interface Job {
company: string;
position: string;
jobStatus: JobStatus;
jobType: JobType;
jobLocation: string;
createdBy: mongoose.Types.ObjectId
}

const JobSchema = new mongoose.Schema<Job>({
    company: String,
    position: String,
    jobStatus: {
        type: String,
        enum: Object.values(JobStatus),
        default: JobStatus.pending
    },

    jobType: {
        type: String,
        enum: Object.values(JobType),
        default: JobType.fullTime
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true
})

const JobModel =  mongoose.model<Job>('job', JobSchema);

export default JobModel;