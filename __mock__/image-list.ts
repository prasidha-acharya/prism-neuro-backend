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
        id: 'visual_video_1722415536421.mp4',
        path: 'images/mode/visual_video_1722415536421.mp4'
      }
    ]
  },
  {
    type: MODE_TYPE.LEFT_RIGHT_MODE,
    images: [
      {
        id: 'left_image_one_1722415845559.jpeg',
        path: 'images/mode/left_image_one_1722415845559.jpeg',
        direction: DIRECTION.LEFT
      },
      {
        id: 'left_image_two_1722415845568.jpeg',
        path: 'images/mode/left_image_two_1722415845568.jpeg',
        direction: DIRECTION.RIGHT
      },
      {
        id: 'right_image_one_1722415845574.png',
        path: 'images/mode/right_image_one_1722415845574.png',
        direction: DIRECTION.RIGHT
      },
      {
        id: 'left_right_mode_1722414584654.png',
        path: 'images/mode/left_right_mode_1722414584654.png',
        direction: DIRECTION.RIGHT
      }
    ]
  }
];
