import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { RequestHandler as Middleware, NextFunction, Request, Response } from 'express';

export class RequestLogger {
  constructor(private db: PrismaClient) {}

  public logs: Middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = randomUUID();
    try {
      const { headers, body, method, url } = req;

      if (req.method !== 'OPTIONS') {
        const requestLogs = await this.db.requestResponseLogs.create({
          data: {
            id,
            method,
            url,
            request: {
              body: body ?? null,
              headers
            }
          }
        });

        const responseSend = res.send;

        let capturedResponse: any;
        res.send = (body: any): any => {
          capturedResponse = body;
          const user_id = req.body?.user?.user_id as string;
          this.db.requestResponseLogs
            .update({
              where: {
                id: requestLogs.id
              },
              data: {
                statusCode: res.statusCode,
                userId: user_id ?? '',
                response: {
                  body
                }
              }
            })
            .catch(err => console.error('Error while updating log:', err));
          return responseSend.call(res, body);
        };

        res.on('finish', () => {
          if (capturedResponse !== undefined) {
            capturedResponse = capturedResponse instanceof Buffer ? capturedResponse.toString() : capturedResponse;
          }
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
