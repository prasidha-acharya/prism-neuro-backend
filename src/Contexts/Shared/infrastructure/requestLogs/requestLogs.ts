import { NextFunction, Request, Response } from 'express';

export class RequestLogger {
  constructor() {}

  public logs = async (req: Request, res: Response, next: NextFunction) => {
    const { method, body, url, headers } = req;

    console.log(method, body, url, headers);
    try {
    } catch (error) {
      next(error);
    }
  };
}
