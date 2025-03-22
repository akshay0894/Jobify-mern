import { Request, Response } from "express";
import UserModel from "../models/user";
import { AuthRequest } from "../middleware/authMiddleware";
import JobModel from "../models/job";




export const getCurrentUser = async (req:AuthRequest, res:Response) => {
 console.log("====getcurrentUser", req);
    const user = await UserModel.findOne({_id: req.user?.userId});
  const userWithoutPassword = user?.toJSON();
  res.status(200).json({user:userWithoutPassword});
};

export const getApplicationStats = async (req:Request, res: Response) => {
    const users = await UserModel.countDocuments();
    const jobs = await JobModel.countDocuments();

    res.status(200).json({ users,jobs});
};

export const updateUser = async (req:AuthRequest, res:Response) => {
    const updatedUser = await UserModel.findByIdAndUpdate(req.user?.userId, req.body);
    res.status(200).json({ msg: 'user updated' });
};