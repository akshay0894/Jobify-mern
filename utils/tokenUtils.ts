import jwt from 'jsonwebtoken';

export const createJWT = (payload: any) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as any, {
    expiresIn: process.env.JWT_EXPIRES_IN as any,
  });
  return token;
};

export const  verifyJWT = (token: string) => {
     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
     return decoded;
}