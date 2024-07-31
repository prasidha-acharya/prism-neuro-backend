import { MODE_TYPE } from '@prisma/client';

export const modeTypes = [
  {
    name: 'Balance Mode-with Feedback',
    images: [],
    trialCount: 3,
    trialDuration: 30,
    type: MODE_TYPE.BALANCE_MODE,
    modeDetail: {
      instructions: [
        'Place the balance board on a stable surface and stand comfortably.',
        'Shift your weight gently from side to side on the board.',
        'Evaluate your balance and movement as you shift your body.'
      ]
    }
  },
  {
    type: MODE_TYPE.TARGET_MODE,
    name: 'Target Mode',
    trialCount: 3,
    trialDuration: 30,
    images: [],
    modeDetail: {
      instructions: [
        'Position yourself stably on the balance board.',
        'Move towards each target displayed on the screen.',
        'Complete the task by accurately targeting as many points as possible within 30 seconds.'
      ]
    }
  },
  {
    type: MODE_TYPE.LEFT_RIGHT_MODE,
    instructions: [
      'Stand on the balance board while viewing a total of 50 randomly displayed images, including 25 left foot and 25 right foot images, on the screen.',
      'Promptly tilt the trainer board left or right.',
      'Concentrate on responding accurately and promptly to the directional prompts given by the displayed images.'
    ],
    name: 'Left and Right Mode',
    trialCount: 3,
    images: [],
    modeDetail: {
      imageUrls: [],
      instructions: [
        'Position yourself stably on the balance board.',
        'Move towards each target displayed on the screen.',
        'Complete the task by accurately targeting as many points as possible within 30 seconds.'
      ]
    }
  },
  {
    type: MODE_TYPE.VISUAL_BALANCE_MODE,
    instructions: [
      'Place the balance board on a stable surface and stand comfortably.',
      'Shift your weight gently from side to side on the board.',
      'Evaluate your balance and movement as you shift your body.'
    ],
    name: 'Balance Mode with visuals-no Feedback',
    trialCount: 3,
    images: [],
    modeDetail: {
      videoUrls: [],
      instructions: [
        'Position yourself stably on the balance board.',
        'Move towards each target displayed on the screen.',
        'Complete the task by accurately targeting as many points as possible within 30 seconds.'
      ]
    }
  }
];
