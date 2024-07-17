import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { DeleteAccountService } from '../../../../../contexts/prism-neuro/users/application/delete-account.service';
import { GetAdminByEmailService } from '../../../../../contexts/prism-neuro/users/application/get-admin-email.service';
import { HTTP422Error } from '../../../../../contexts/shared/domain/errors/http.exception';
import { comparePassword } from '../../../../../contexts/shared/infrastructure/encryptor/encryptor';
import { MESSAGE_CODES } from '../../../../../contexts/shared/infrastructure/utils/message-code';
import { Controller } from '../controller';

export class DeleteAccountController implements Controller {
  constructor(
    private deleteAccountService: DeleteAccountService,
    private getAdminByEmailService: GetAdminByEmailService
  ) {}

  async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId, email, role } = req.body.user;

    const password = req.body.password;

    try {
      const user = await this.getAdminByEmailService.invoke({ email, role });

      if (!user || (user && !comparePassword(password, user.password!))) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: MESSAGE_CODES.USER.INVALID_CREDENTIALS, status: 'ERROR' });
        return;
      }

      if (!userId) {
        throw new HTTP422Error(MESSAGE_CODES.PERMISSION_DENIED);
      }
      await this.deleteAccountService.invoke(userId);
      res.status(httpStatus.OK).json({ status: 'SUCCESS' });
    } catch (error) {
      next(error);
    }
  }
}
