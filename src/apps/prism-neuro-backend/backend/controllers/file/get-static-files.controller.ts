import { MODE_TYPE } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import path from 'path';
import { Controller } from '../controller';
const paths = path.join(__dirname, '__mock__/image-list');

console.log('🚀 ~ paths:', paths);

const DIRECTION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
} as const;

export const imagesList = [
  {
    type: MODE_TYPE.VISUAL_BALANCE_MODE,
    videos: [
      {
        path: '/public/images/mode/visual_video_1722415536421.mp4'
      }
    ]
  },
  {
    type: MODE_TYPE.LEFT_RIGHT_MODE,
    images: [
      {
        path: '/public/images/mode/left_image_one_1722415845559.jpeg',
        direction: DIRECTION.LEFT
      },
      {
        path: '/public/images/mode/visual_video_1722415536421.mp4',
        direction: DIRECTION.RIGHT
      },
      {
        path: '/public/images/mode/visual_video_1722415536421.mp4',
        direction: DIRECTION.RIGHT
      },
      {
        path: '/public/images/mode/visual_video_1722415536421.mp4',
        direction: DIRECTION.RIGHT
      },
      {
        path: '/public/images/mode/visual_video_1722415536421.mp4',
        direction: DIRECTION.RIGHT
      },
      {
        path: '/public/images/mode/visual_video_1722415536421.mp4',
        direction: DIRECTION.LEFT
      }
    ]
  }
];

export class GetStaticFilesController implements Controller {
  invoke(req: Request, res: Response, next: NextFunction): any {
    console.log('🚀 ~ GetStaticFilesController ~ invoke ~ paths:', paths);
    const modeType = req.query.type as unknown as MODE_TYPE;

    const responses = imagesList.filter(({ type }) => type === modeType);

    try {
      res.status(httpStatus.OK).json({
        data: responses,
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}
