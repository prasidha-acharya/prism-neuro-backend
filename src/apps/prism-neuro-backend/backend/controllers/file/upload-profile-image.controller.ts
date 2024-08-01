import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { HTTP400Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { UploadFileToBucketService } from '../../../../../contexts/shared/infrastructure/file/application/upload-file-to-bucket.service';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { getCurrentTimeStamp } from '../../../../../contexts/shared/infrastructure/utils/date';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

const regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/g;

export class UploadProfileImageController implements Controller {
  constructor(private uploadFileToBucketService: UploadFileToBucketService) {}

  public validate = [body('uploadFor').exists().withMessage('REQUIRED_UPLOAD_FOR'), RequestValidator];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const file = req.file as Express.Multer.File;

    const uploadFor = req.body.uploadFor;

    try {
      if (!file) {
        throw new HTTP400Error(MESSAGE_CODES.FILE.FILE_IS_REQUIRED);
      }

      const fileInfo = file.originalname.split('.');

      const fileExtension = fileInfo.pop();

      const fileName = fileInfo.pop()?.replace(regex, '_');

      const key = `/PROFILE/${uploadFor}/${fileName}_${getCurrentTimeStamp()}.${fileExtension}`;

      const profileURLs = await this.uploadFileToBucketService.invoke(key, file);

      res.status(httpStatus.OK).json({
        data: {
          path: profileURLs.key,
          profileURL: profileURLs.url
        },
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}
