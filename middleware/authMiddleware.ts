import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../utils/customError";
import { verifyJWT } from "../utils/tokenUtils";
import { Role } from "../utils/constants";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    testUser: boolean;
  };
}

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new UnauthenticatedError("authentication failed"));
  }
  try {
    const { userId, role } = verifyJWT(token) as { userId: string; role: Role };
    const testUser = userId === "67b21cffbb3f239db713cedf";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    return next(new UnauthenticatedError("authentication failed"));
  }
};

export const authorizePermissions = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role as string)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export const checkForTestUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.testUser) {
    return next(new BadRequestError("Demo User. Read Only!"));
  }
  next();
};
