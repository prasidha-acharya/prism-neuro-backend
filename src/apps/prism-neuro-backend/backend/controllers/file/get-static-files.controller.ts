import { MODE_TYPE } from '@prisma/client';
import { Configuration } from 'config';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { imagesList } from '../../../../../../__mock__/image-list';
import { Controller } from '../controller';

export class GetStaticFilesController implements Controller {
  constructor(private config: Configuration) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const modeType = req.query.type as unknown as MODE_TYPE;

    const response = imagesList.reduce((finalResult: any[], image) => {
      if (image.type === modeType) {
        const images = image.images?.map(img => {
          return {
            ...img,
            path: `${this.config.BASE_URL}/${img.path}`,
            type: modeType
          };
        });

        finalResult = [...finalResult, ...(images ?? [])];
      }
      return finalResult;
    }, []);

    try {
      res.status(httpStatus.OK).json({
        data: response,
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}
