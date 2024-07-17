import { MODE_SESSION_STATUS, MODE_TRIAL_SESSION_STATUS, ModeTrialSession, USER_ROLES } from '@prisma/client';
import { IGetUserListByAdminResponse, IPrismaUserResponse } from '../interface/user.response.interface';

// TODO: remove any
export class UserTransformer {
  public loginLists(data: any): any {
    // eslint-disable-next-line no-unused-vars
    const { password, physioModeSession, patientModeSession, ...remainigData } = data;

    const modeSession =
      remainigData.role === USER_ROLES.ADMIN ? null : remainigData.role === USER_ROLES.PHYSIO ? physioModeSession[0] : patientModeSession[0];
    return {
      ...remainigData,
      modeSession
    };
  }

  public patientListsByPhysio(data: any): any {
    return data.data.map((user: any) => {
      return {
        email: user.email,
        age: user.userDetail.age ?? null,
        fullName: `${user.firstName} ${user.lastName}`,
        totalSession: user.patientModeSession.reduce((total: number, modeSesson: any) => {
          const isTrialCompleted =
            modeSesson.modeTrialSession.length > 0 &&
            modeSesson.modeTrialSession.every((trialSession: ModeTrialSession) => trialSession.status === MODE_TRIAL_SESSION_STATUS.COMPLETED);

          if (modeSesson.status === MODE_SESSION_STATUS.STOP && isTrialCompleted) {
            total += 1;
          }
          return total;
        }, 0)
      };
    });
  }

  public userListsByAdmin(users: IPrismaUserResponse[]): IGetUserListByAdminResponse[] {
    return users.map(({ id, firstLogin, email, firstName, lastName, userDetail, userAddress, role, patients }) => {
      const { phoneNumber, phoneCode } = userDetail ?? {};

      let contactNumber = phoneNumber && phoneCode ? `${phoneCode}-${phoneNumber}` : null;

      // firstName and lastName is null for admin only

      let userList: IGetUserListByAdminResponse = {
        id,
        isVerified: !firstLogin,
        firstName: firstName!,
        lastName: lastName!,
        email,
        profileURL: userDetail?.profileURL ?? null,
        userAddress,
        age: userDetail?.age ?? null,
        weight: userDetail?.weight ?? null,
        contactNumber
      };

      if (role === USER_ROLES.PHYSIO) {
        userList.patients = patients?.length ?? 0;
      }

      return userList;
    });
  }
}
