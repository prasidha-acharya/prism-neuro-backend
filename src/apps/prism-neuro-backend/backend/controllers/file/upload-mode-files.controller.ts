import { FILE_TYPE } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateFileService } from 'src/contexts/shared/infrastructure/file/application/create-file.service';
import { ICreateFileRequest } from 'src/contexts/shared/infrastructure/file/domain/interface/file-request.interface';
import { UploadFileToBucketService } from '../../../../../contexts/shared/infrastructure/file/application/upload-file-to-bucket.service';
import { getCurrentTimeStamp } from '../../../../../contexts/shared/infrastructure/utils/date';
import { Controller } from '../controller';

export class UploadModeFilesController implements Controller {
  constructor(
    private uploadFileToBucketService: UploadFileToBucketService,
    private createFileService: CreateFileService
  ) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const files = req.files as Express.Multer.File[];
    const { type } = req.body as { type: FILE_TYPE };

    try {
      const response = files?.map(file => {
        const fileExtension = file.originalname.split('.').pop();

        const key = `${type}/${getCurrentTimeStamp()}.${fileExtension}`;

        return this.uploadFileToBucketService.invoke(key, file);
      });

      const imagesURLs = await Promise.all(response);

      const request: ICreateFileRequest[] = imagesURLs.map(data => {
        const fileName = data.split('/').shift() ?? '';
        return {
          name: fileName,
          url: data,
          type
        };
      });

      // upload image URl  to database

      await this.createFileService.invoke(request);

      res.status(httpStatus.CREATED).json({ status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}
