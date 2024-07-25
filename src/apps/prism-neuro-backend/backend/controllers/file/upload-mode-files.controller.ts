import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Configuration } from 'config';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { s3Client } from '../../../../../contexts/shared/infrastructure/bucket/s3-client';
import { getCurrentTimeStamp } from '../../../../../contexts/shared/infrastructure/utils/date';
import { Controller } from '../controller';

export class UploadModeFilesController implements Controller {
  constructor(private config: Configuration) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('filee', req.body);
    const files = req.file;

    // console.log(files, req.file, req.files);

    const { type } = req.body;
    const fileExtension = files?.originalname.split('.').pop();

    try {
      const key = `${type}/${files?.originalname}-${getCurrentTimeStamp()}.${fileExtension}`;

      const command = new PutObjectCommand({
        Bucket: this.config.AWS.BUCKET_NAME,
        Key: key,
        Body: files?.buffer,
        ContentType: files?.mimetype
      });

      await s3Client.send(command);
      //

      res.status(httpStatus.CREATED).json({ status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}
