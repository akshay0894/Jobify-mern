// declare namespace Express {
//     export interface Request {
//       user: any
//     }
//   }

4

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}