import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { DeleteFileFromBucketService } from '../../../../../contexts/shared/infrastructure/file/application/delete-file-from-bucket.service';
import { Controller } from '../controller';

export class DeleteFilesController implements Controller {
  constructor(private deleteFileFromBucketService: DeleteFileFromBucketService) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { key } = req.body;
    try {
      //check role
      await this.deleteFileFromBucketService.invoke(key);
      res.status(httpStatus.OK).send({
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}
