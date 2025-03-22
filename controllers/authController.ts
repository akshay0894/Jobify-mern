import { Request, Response } from "express";
import UserModel from "../models/user";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import { UnauthenticatedError } from "../utils/customError";
import { createJWT } from "../utils/tokenUtils";


export const register = async(req: Request,res: Response) => {
 
    const isFirstAccount = (await UserModel.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
    
    const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
    const user = await UserModel.create(req.body);
    res.status(201).send({msg: 'user created successfully'})
};

export const login = async(req: Request, res: Response) => {
    console.log("===login",login);
    const user= await UserModel.findOne({email: req.body.email});

    const isValidUser = user && (await comparePassword(req.body.password,user.password));
    if (!isValidUser) throw new UnauthenticatedError('invalid credentials');
    const token = createJWT({userId: user._id, role: user.role});
    
    const oneDay = 1000 * 60 * 60 * 24;
    console.log(token,new Date(Date.now() + oneDay));
res.cookie('token', token, {
  httpOnly: true,
  expires: new Date(Date.now() + oneDay),
  secure: process.env.NODE_ENV === 'production',
});
    res.status(200).send({msg: 'login successfully'});
};

export const logout = (req: Request,res: Response) => {
    res.cookie('token','logout',{
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(200).json({ msg: 'user logged out!' });
}