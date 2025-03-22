import { NextFunction, Request, Response } from "express";
import JobModel from "../models/job";
import logger from "../utils/logger";
import { AuthRequest } from "../middleware/authMiddleware";
import { readFile } from "fs/promises";
import UserModel from "../models/user";
import { JOB_SORT_BY } from "../utils/constants";

export const getAllJobs = async (req: AuthRequest, res: Response) => {
  try {
    const { search, jobStatus, jobType, sort } = req.query;
    const queryObject: any = {};
    if (search) {
      queryObject.$or = [
        { position: { $regex: search, $options: "i" } },
        {
          company: { $regex: search, $options: "i" },
        },
      ];
    }
    if (jobStatus && jobStatus !== "all") {
      queryObject.jobStatus = jobStatus;
    }
    if (jobType && jobType !== "all") {
      queryObject.jobType = jobType;
    }

    const sortOptions: { [key: string]: string } = {
      newest: "-createdAt",
      oldest: "createdAt",
      "a-z": "position",
      "z-a": "-position",
    };

    let sortKey = sortOptions.newest;
    if (typeof sort === "string" && sort in sortOptions) {
      sortKey = sortOptions[sortKey];
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    //createdBy: req.user?.userId;
    const jobs = await JobModel.find(queryObject)
      .sort(sortKey)
      .skip(skip)
      .limit(limit);
    const totalJobs = await JobModel.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);
    res.status(200).json({ totalJobs, numOfPages, currentPage: page, jobs });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: "server error" });
  }
};

export const createJob = async (req: AuthRequest, res: Response) => {
  const { company, position } = req.body;
  try {
    req.body.createdBy = req.user?.userId;
    const job = await JobModel.create(req.body);
    res.status(201).json({ job });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: "server error" });
  }
};

export const getJob = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const job = await JobModel.findById(id);

    res.status(200).json({ job });
  } catch (error) {
    console.log("====error");
    next(error);
  }
};

export const deleteJob = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const removedJob = await JobModel.deleteOne({ _id: id });

  res.status(200).json({ job: removedJob });
};

export const updateJob = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ job: updatedJob });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: "server error" });
  }
};
