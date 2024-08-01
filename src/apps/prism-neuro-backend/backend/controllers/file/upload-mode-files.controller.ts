import { FILE_TYPE } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { HTTP422Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { CreateFileService } from '../../../../../contexts/shared/infrastructure/file/application/create-file.service';
import { UploadFileToBucketService } from '../../../../../contexts/shared/infrastructure/file/application/upload-file-to-bucket.service';
import { ICreateFileRequest } from '../../../../../contexts/shared/infrastructure/file/domain/interface/file-request.interface';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { getCurrentTimeStamp } from '../../../../../contexts/shared/infrastructure/utils/date';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class UploadModeFilesController implements Controller {
  constructor(
    private uploadFileToBucketService: UploadFileToBucketService,
    private createFileService: CreateFileService
  ) {}

  public validate = [
    body('type'),
    body('isLeftMode').custom(val => {
      console.log(typeof val, 'value', val);
      if (val === 'false') {
        throw new HTTP422Error(MESSAGE_CODES.FILE.IS_LEFT_MODE_MUST_BE_TRUE);
      }

      return true;
    }),
    body('isRightMode').custom(val => {
      if (val === 'false') {
        throw new HTTP422Error(MESSAGE_CODES.FILE.IS_RIGHT_MODE_MUST_BE_TRUE);
      }

      if (val === 'true' && val === 'true') {
        throw new HTTP422Error(MESSAGE_CODES.FILE.CANNOT_CREATE_FILE_WHEN_BOTH_LEFT_MODE_AND_RIGHT_MODE_ARE_TRUE);
      }

      return true;
    }),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const files = req.files as Express.Multer.File[];
    const { type } = req.body as { type: FILE_TYPE };

    try {
      if (files.length == 0) {
        throw new HTTP422Error(MESSAGE_CODES.FILE.FILE_IS_REQUIRED);
      }
      const response = files?.map(file => {
        const fileExtension = file.originalname.split('.').pop();

        const key = `${type}/${getCurrentTimeStamp()}.${fileExtension}`;

        return this.uploadFileToBucketService.invoke(key, file);
      });

      const imagesURLs = await Promise.all(response);

      const request: ICreateFileRequest[] = imagesURLs.map(({ key }) => {
        const fileName = key.split('/').pop() ?? '';
        return {
          name: fileName,
          url: key,
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
