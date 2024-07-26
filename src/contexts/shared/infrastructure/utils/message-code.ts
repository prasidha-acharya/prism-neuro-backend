export const MESSAGE_CODES = {
  SUCCESS: 'SUCCESS',
  NOT_AUTHORIZED: 'NOT_AUTHORIZED',
  BAD_REQUEST: 'BAD_REQUEST',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  NOT_FOUND: 'NOT_FOUND',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
  USER: {
    INVALID_PHYSIO_THERAPIST: 'INVALID_PHYSIO_THERAPIST',
    INVALID_PATIENT: 'INVALID_PATIENT',
    REQUIRED_FIRST_NAME: 'REQUIRED_FIRST_NAME',
    REQUIRED_LAST_NAME: 'REQUIRED_LAST_NAME',
    AGE_SHOULD_BE_NUMBER: 'AGE_SHOULD_BE_NUMBER',
    WEIGHT_SHOULD_BE_NUMBER: 'WEIGHT_SHOULD_BE_NUMBER',
    INVALID_FIRST_NAME: 'INVALID_FIRST_NAME',
    INVALID_LAST_NAME: 'INVALID_LAST_NAME',
    REQUIRED_ADDRESS: 'REQUIRED_ADDRESS',
    REQUIRED_PHONE_NUMBER: 'REQUIRED_PHONE_NUMBER',
    REQUIRED_PHONE_CODE: 'REQUIRED_PHONE_CODE',
    INVALID_CONTACT_NUMBER: 'INVALID_CONTACT_NUMBER',
    CONTACT_NUMBER_MUST_BE_10_DIGIT: 'CONTACT_NUMBER_MUST_BE_10_DIGIT',
    REQUIRED_EMAIL: 'REQUIRED_EMAIL',
    NOT_FOUND: 'NOT_FOUND',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    INVALID_REFRESH_TOKEN: 'INVALID_REFRESH_TOKEN',
    EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
    REQUIRED_OLD_PASSWORD: 'REQUIRED_OLD_PASSWORD',
    REQUIRED_NEW_PASSWORD: 'REQUIRED_NEW_PASSWORD',
    REQUIRED_CONFIRMED_PASSWORD: 'REQUIRED_CONFIRMED_PASSWORD',
    REQUIRED_PASSWORD: 'REQUIRED_PASSWORD',
    REQUIRED_USER_ID: 'REQUIRED_USER_ID',
    PASSWORD_MIN_LENGTH: 'PASSWORD_MIN_LENGTH',
    OLD_AND_NEW_PASSWORD_IS_SAME: 'OLD_AND_NEW_PASSWORD_IS_SAME',
    CONFIRM_PASSWORD_NOT_MATCH: 'CONFIRM_PASSWORD_NOT_MATCH',
    REQUIRED_OTP: 'REQUIRED_OTP',
    INVALID_OTP: 'INVALID_OTP',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    INVALID_NAME: 'INVALID_NAME',
    INVALID_EMAIL: 'INVALID_EMAIL',
    INVALID_PHONE: 'INVALID_PHONE',
    VERIFY_OTP: 'VERIFY_OTP',
    MIN_OTP_LENGTH_5: 'MIN_OTP_LENGTH_5',
    INVALID_ADDRESS: 'INVALID_ADDRESS',
    REQUIRED_OTP_TYPE: 'REQUIRED_OTP_TYPE',
    INVALID_OTP_TYPE: 'INVALID_OTP_TYPE',
    DATE_OF_BIRTH_MUST_BE_LESS_THAN_TODAY: 'DATE_OF_BIRTH_MUST_BE_LESS_THAN_TODAY',
    USER_BLOCKED: 'USER_BLOCKED',
    REQUIRED_ROLE: 'REQUIRED_ROLE',
    REQUIRED_PHYSIO_ID: 'REQUIRED_PHYSIO_ID',
    REQUIRED_PATIENT_ID: 'REQUIRED_PATIENT_ID',
    ADDRESS: {
      REQUIRED_ADDRESS_ID: 'REQUIRED_ADDRESS_ID',
      REQUIRED_ADDRESS_NAME: 'REQUIRED_ADDRESS_NAME'
    }
  },
  MODE: {
    INVALID_TRIAL_NUMBER: 'INVALID_TRIAL_NUMBER',
    REQUIRED_MODE_ID: 'REQUIRED_MODE_ID',
    REQUIRED_MODE_TRIAL_ID: 'REQUIRED_MODE_ID',
    REQUIRED_TRIAL_NUMBER: 'REQUIRED_TRIAL_NUMBER',
    REQUIRED_PHYSIO_ID: 'REQUIRED_PHYSIO_ID',
    REQUIRED_PATIENT_ID: 'REQUIRED_PATIENT_ID',
    REQUIRED_SESSION_ID: 'REQUIRED_SESSION_ID',
    CANNOT_CREATE_MODE_SESSION: 'CANNOT_CREATE_MODE_SESSION',
    SESSION_IS_NOT_STARTED: 'SESSION_IS_NOT_STARTED',
    CANNOT_END_MODE_SESSION: 'CANNOT_END_MODE_SESSION',
    MODE_SESSION_NOT_FOUND: 'MODE_SESSION_NOT_FOUND',
    REQUIRED_FILTER_OR_DATE_RANGE: 'REQUIRED_FILTER_OR_DATE_RANGE',
    TRIAL_IS_NOT_COMPLETED: 'TRIAL_IS_NOT_COMPLETED',
    DUPLICATE_TRIAL_ID: 'DUPLICATE_TRIAL_ID'
  },
  FILE: {
    IS_LEFT_MODE_IS_REQUIRED: 'IS_LEFT_MODE_IS_REQUIRED',
    IS_RIGHT_MODE_IS_REQUIRED: 'IS_RIGHT_MODE_IS_REQUIRE',
    IS_RIGHT_MODE_MUST_BE_TRUE: 'IS_RIGHT_MODE_MUST_BE_TRUE',
    IS_LEFT_MODE_MUST_BE_TRUE: 'IS_RIGHT_MODE_MUST_BE_TRUE',
    FILE_IS_REQUIRED: 'FILE_IS_REQUIRED',
    CANNOT_CREATE_FILE_WHEN_BOTH_LEFT_MODE_AND_RIGHT_MODE_ARE_TRUE: 'CANNOT_CREATE_FILE_WHEN_BOTH_LEFT_MODE_AND_RIGHT_MODE_ARE_TRUE'
  },
  DATE_SHOULD_BE_LESSER_THAN_TODAY: 'DATE_SHOULD_BE_LESSER_THAN_TODAY',
  INVALID_DATE: 'INVALID_DATE',
  FROM_DATE_SHOULD_BE_SMALLER_THAN_TO_DATE: 'FROM_DATE_SHOULD_BE_SMALLER_THAN_TO_DATE'
};
