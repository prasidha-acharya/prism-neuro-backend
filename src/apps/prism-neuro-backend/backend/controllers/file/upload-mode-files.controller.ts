import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { UploadFileToBucketService } from '../../../../../contexts/shared/infrastructure/file/application/upload-file-to-bucket.service';
import { getCurrentTimeStamp } from '../../../../../contexts/shared/infrastructure/utils/date';
import { Controller } from '../controller';

export class UploadModeFilesController implements Controller {
  constructor(private uploadFileToBucketService: UploadFileToBucketService) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const files = req.files as Express.Multer.File[];
    const { type } = req.body;

    try {
      const response = files?.map(file => {
        const fileExtension = file.originalname.split('.').pop();

        const key = `${type}/${getCurrentTimeStamp()}.${fileExtension}`;

        return this.uploadFileToBucketService.invoke(key, file);
      });

      const imagesURL = await Promise.all(response);

      console.log('🚀 ~ UploadModeFilesController ~ invoke ~ imagesURL:', imagesURL);

      // upload string to database

      res.status(httpStatus.CREATED).json({ status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}
