import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { HTTP422Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { UploadFileToBucketService } from '../../../../../contexts/shared/infrastructure/file/application/upload-file-to-bucket.service';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { getCurrentTimeStamp } from '../../../../../contexts/shared/infrastructure/utils/date';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class UploadProfileImageController implements Controller {
  constructor(private uploadFileToBucketService: UploadFileToBucketService) {}

  public validate = [body('uploadFor').exists().withMessage('REQUIRED_UPLOAD_FOR'), RequestValidator];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const file = req.file as Express.Multer.File;

    const uploadFor = req.body.uploadFor;

    try {
      if (!file) {
        throw new HTTP422Error(MESSAGE_CODES.FILE.FILE_IS_REQUIRED);
      }

      // const regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/g;

      const fileInfo = file.originalname.split('.');

      const fileExtension = fileInfo.pop();

      // const fileName =fileInfo.slice(0,fileInfo.length-1)

      const key = `/PROFILE/${uploadFor}/${getCurrentTimeStamp()}.${fileExtension}`;

      const profileURL = await this.uploadFileToBucketService.invoke(key, file);

      res.status(httpStatus.OK).json({
        data: {
          profileURL
        },
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}
