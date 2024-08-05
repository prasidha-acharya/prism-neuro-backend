import { MODE_SESSION_STATUS, MODE_TRIAL_SESSION_STATUS, ModeTrialSession, Prisma, USER_ROLES } from '@prisma/client';
import { GetSignedURLService } from '../../../../../contexts/shared/infrastructure/file/application/get-signed-url.service';
import {
  IGetPatientPerformance,
  IGetUserDetailByIdResponse,
  IGetUserListByAdminResponse,
  IPrismaGetUserByEmail,
  IPrismaUserDetailByEmailAndRole,
  IPrismaUserResponse,
  UserResponse
} from '../interface/user.response.interface';

// TODO: remove any
export class UserTransformer {
  constructor(private getSignedURLService: GetSignedURLService) {}

  public async loginLists(data: IPrismaGetUserByEmail): Promise<UserResponse> {
    // eslint-disable-next-line no-unused-vars
    const { password, physioModeSession, patientModeSession, ...remainigData } = data;

    const { userDetail, id, email, isVerified, firstName, lastLogin, lastName, role, userAddress, userName } = remainigData;

    const modeSession =
      remainigData.role === USER_ROLES.ADMIN
        ? null
        : remainigData.role === USER_ROLES.PHYSIO
          ? physioModeSession?.[0] ?? null
          : patientModeSession?.[0] ?? null;

    let profileURL: string | null = null;

    if (userDetail?.profileURL) {
      profileURL = await this.getSignedURLService.invoke(userDetail.profileURL);
    }

    return {
      id,
      email,
      isVerified,
      firstName,
      lastName,
      userName,
      userAddress,
      role,
      lastLogin,
      modeSession,
      phoneNumber: userDetail?.phoneNumber ?? null,
      phoneCode: userDetail?.phoneCode ?? null,
      profile: {
        path: userDetail?.profileURL ?? null,
        profileURL
      },
      age: userDetail?.age ?? null,
      weight: userDetail?.weight ?? null
    };
  }

  public patientListsByPhysio(data: any): any {
    return data.data.map((user: any) => {
      return {
        id: user.id,
        email: user.email,
        age: user?.userDetail?.age ?? null,
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
    return users.map(({ id, isVerified, email, firstName, lastName, userDetail, userAddress, role, patients }) => {
      const { phoneNumber, phoneCode } = userDetail ?? {};

      let contactNumber = phoneNumber && phoneCode ? `${phoneCode}-${phoneNumber}` : null;

      // firstName and lastName is null for admin only

      let userList: IGetUserListByAdminResponse = {
        id,
        isVerified,
        firstName: firstName!,
        lastName: lastName!,
        email,
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

  public getPerformanceSummary(trials: ModeTrialSession[]): IGetPatientPerformance {
    const response = trials.reduce(
      (scores, trial) => {
        if (trial?.results && typeof trial.results === 'object') {
          const result = trial.results as Prisma.JsonObject;
          const data = Number(result.data);

          scores.bestScores = data > scores.bestScores ? data : scores.bestScores;
          scores.totalScores += data;
        }
        return scores;
      },
      { bestScores: 0, totalScores: 0 }
    );

    return {
      bestScores: response.bestScores,
      averageScores: response?.totalScores > 0 ? response.totalScores / trials.length : 0
    };
  }

  public userDetailInfoByIdForDashBoard(user: IPrismaUserDetailByEmailAndRole): IGetUserDetailByIdResponse {
    const { email, firstName, lastName, isVerified, userDetail, userAddress } = user;
    return {
      email,
      firstName: firstName ?? null,
      lastName: lastName ?? null,
      isVerified,
      weight: userDetail?.weight ?? null,
      age: userDetail?.age ?? null,
      phoneCode: userDetail?.phoneCode ?? null,
      phoneNumber: userDetail?.phoneNumber ?? null,
      userAddress: userAddress.map(({ id, address }) => ({ id, address }))
    };
  }
}
