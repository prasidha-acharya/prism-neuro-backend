import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { GetFilesService } from '../../../../../contexts/shared/infrastructure/file/application/get-files.service';
import { IGetFileRequest } from '../../../../../contexts/shared/infrastructure/file/domain/interface/file-request.interface';
import { FileTransformer } from '../../../../../contexts/shared/infrastructure/transformer/files.transformer';
import { Controller } from '../controller';

export class GetModeFilesController implements Controller {
  constructor(
    private getFilesService: GetFilesService,
    private fileTransformer: FileTransformer
  ) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { type, isLeftMode, isRightMode } = req.query as unknown as IGetFileRequest;

    try {
      const files = await this.getFilesService.invoke({
        type,
        isLeftMode: isLeftMode ? true : undefined,
        isRightMode: isRightMode ? true : undefined
      });

      const response = files === null ? [] : await this.fileTransformer.invoke(files);

      res.status(httpStatus.OK).json({
        data: response,
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}
