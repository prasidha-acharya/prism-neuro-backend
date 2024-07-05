// import { NextFunction, Request, Response } from 'express';
// import { ParamsDictionary } from 'express-serve-static-core';
// import httpStatus from 'http-status';
// import { ParsedQs } from 'qs';
// import { Controller } from '../controller';

// export class ChangePasswordController implements Controller {
//   constructor() {}

//   invoke(
//     req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
//     res: Response<any, Record<string, any>>,
//     next: NextFunction
//   ): Promise<void> {
//     try {
//       res.status(httpStatus.OK).send();
//     } catch (error) {
//       next(error);
//     }
//   }
// }
