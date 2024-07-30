import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { GetAdminByEmailService } from '../../../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { UserTransformer } from '../../../../../contexts/prism-neuro/users/domain/transformer/user-transformer';
import { Controller } from '../controller';

export class GetUserDetailController implements Controller {
  constructor(
    private getAdminByEmailService: GetAdminByEmailService,
    private userTransformer: UserTransformer
  ) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body.user;
    try {
      const response = await this.getAdminByEmailService.invoke({ email });

      const userDetail = response === null ? [] : await this.userTransformer.loginLists(response);

      res.status(httpStatus.OK).json({
        data: userDetail,
        status: 'SUCCESS'
      });
    } catch (error) {
      next(error);
    }
  }
}
