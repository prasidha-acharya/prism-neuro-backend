import { MODE_TYPE } from '@prisma/client';

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
