import { MODE_TYPE } from '@prisma/client';
import { modeTypes } from '../../domain/constant/create-mode';
import { PrismaModeRepository } from '../repositories/prisma-mode-repository';

export class CreateModeSeeder {
  constructor(private prismaModeRepository: PrismaModeRepository) {}

  public async invoke(): Promise<void> {
    const trialCount = 3;
    const trialDuration = 30;
    try {
      const response = modeTypes.map(type => {
        if (type === MODE_TYPE.BALANCE_MODE) {
          this.prismaModeRepository.createBalanceMode({
            type: MODE_TYPE.BALANCE_MODE,
            trialCount,
            trialDuration,
            name: 'Balance Mode-with Feedback'
          });
        } else if (type === MODE_TYPE.LEFT_RIGHT_MODE) {
          this.prismaModeRepository.createLeftRightMode({
            type: MODE_TYPE.LEFT_RIGHT_MODE,
            trialCount,
            name: 'Left and Right Mode'
          });
        } else if (type === MODE_TYPE.TARGET_MODE) {
          this.prismaModeRepository.createTargetMode({
            type: MODE_TYPE.TARGET_MODE,
            trialCount,
            trialDuration,
            name: 'Target Mode'
          });
        } else {
          this.prismaModeRepository.createVisualBalanceMode({
            type: MODE_TYPE.VISUAL_BALANCE_MODE,
            trialCount,
            name: 'Balance Mode with visuals-no Feedback'
          });
        }
      });

      await Promise.all(response);
    } catch (error) {
      console.log(error);
    }
  }
}
