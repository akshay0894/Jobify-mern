import { NextFunction, Request, Response} from "express";
import { CustomError } from "../utils/customError";
import logger from "../utils/logger";


export const errorHandlerMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
   console.log("===error");
    logger.error(err.message);
    const statusCode = err.statusCode || 500;
    const msg = err.message || 'something went wrong';
    
    res.status(statusCode).json({msg});
};