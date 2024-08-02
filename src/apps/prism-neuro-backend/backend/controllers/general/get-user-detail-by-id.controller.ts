import { USER_ROLES } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { param, query } from 'express-validator';
import httpStatus from 'http-status';
import { GetUserByRoleService } from '../../../../../contexts/prism-neuro/users/application/get-user-by-role.service';
import { UserTransformer } from '../../../../../contexts/prism-neuro/users/domain/transformer/user-transformer';
import { RequestValidator } from '../../../../../contexts/shared/infrastructure/middleware/request-validator';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class GetUserDetailByIdController implements Controller {
  constructor(
    private getUserByRoleService: GetUserByRoleService,
    private userTransformer: UserTransformer
  ) {}

  public validate = [
    param('userId').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_USER_ID),
    query('role').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_ROLE),
    RequestValidator
  ];

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.params.userId as string;
    const role = req.query.role as USER_ROLES;

    try {
      const response = await this.getUserByRoleService.invoke({ userId, role });

      const userDetail = response === null ? null : this.userTransformer.userDetailInfoByIdForDashBoard(response);

      res.status(httpStatus.OK).json({
        data: userDetail,
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}
