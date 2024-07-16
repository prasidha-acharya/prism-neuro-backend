import { MODE_TRIAL_SESSION_STATUS } from '@prisma/client';
import { IPrismaModeSessionRequest } from '../../../../contexts/prism-neuro/mode-session/domain/interface/mode-session-request.interface';

export class ActivityTransformer {
  public activityResponse(activities: IPrismaModeSessionRequest[]): any {
    return activities.map(({ id, createdAt, modeTrialSession, physio, patient }) => {
      const { profileURL: physioProfile = null } = physio?.userDetail ?? {};
      const { profileURL: patientProfile = null } = patient?.userDetail ?? {};

      return {
        id,
        createdAt,
        patient: { profileURL: patientProfile, fullName: `${patient.firstName} ${patient.lastName}` },
        email: patient.email,
        physioTherapist: { profileURL: physioProfile, fullName: `${patient.firstName} ${patient.lastName}` },
        session:
          modeTrialSession.length > 0 && modeTrialSession.every(({ status: trialStaus }) => trialStaus === MODE_TRIAL_SESSION_STATUS.COMPLETED)
            ? 1
            : 0
      };
    });
  }
}
