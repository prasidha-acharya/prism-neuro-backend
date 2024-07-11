import { MODE_TYPE } from '@prisma/client';
import { modeTypes } from '../../domain/constant/create-mode';
import { PrismaModeRepository } from '../repositories/prisma-mode-repository';

export class CreateModeSeeder {
  constructor(private prismaModeRepository: PrismaModeRepository) {}

  public async invoke(): Promise<void> {
    try {
      const response = modeTypes.map(async ({ type, name, instructions, trialCount, trialDuration }) => {
        if (type === MODE_TYPE.BALANCE_MODE) {
          const isModeAvailable = await this.prismaModeRepository.getModeByType({ type });

          if (!isModeAvailable) {
            this.prismaModeRepository.createBalanceMode(
              {
                type: MODE_TYPE.BALANCE_MODE,
                trialCount,
                trialDuration,
                name
              },
              instructions
            );
          }
        } else if (type === MODE_TYPE.LEFT_RIGHT_MODE) {
          const isModeAvailable = await this.prismaModeRepository.getModeByType({ type });

          if (!isModeAvailable) {
            this.prismaModeRepository.createLeftRightMode(
              {
                type: MODE_TYPE.LEFT_RIGHT_MODE,
                trialCount,
                name
              },
              instructions
            );
          }
        } else if (type === MODE_TYPE.TARGET_MODE) {
          const isModeAvailable = await this.prismaModeRepository.getModeByType({ type });

          if (!isModeAvailable) {
            this.prismaModeRepository.createTargetMode(
              {
                type: MODE_TYPE.TARGET_MODE,
                trialCount,
                trialDuration,
                name
              },
              instructions
            );
          }
        } else {
          const isModeAvailable = await this.prismaModeRepository.getModeByType({ type });

          if (!isModeAvailable) {
            this.prismaModeRepository.createVisualBalanceMode(
              {
                type: MODE_TYPE.VISUAL_BALANCE_MODE,
                trialCount,
                name
              },
              instructions
            );
          }
        }
      });

      await Promise.all(response);
    } catch (error) {
      console.log(error);
    }
  }
}
