import { FILE_TYPE } from '@prisma/client';

const createPhysioRequest = {
  physioTherapist: {
    $firstName: 'John',
    $lastName: 'Doe',
    $email: 'user@gmail.com',
    phoneCode: '+977',
    phoneNumber: '9807865432',
    $address: 'Kapan'
  }
};

const updatePhysioRequest = {
  physioTherapist: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@gmail.com',
    phoneCode: '+977',
    phoneNumber: '9807865432',
    address: 'Kapan'
  }
};

const updatePatientRequest = {
  patient: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@gmail.com',
    phoneCode: '+977',
    phoneNumber: '9807865432'
  }
};

const trials = {
  id: 'string',
  trialId: 'number',
  result: 'number | null'
};

const pagination = {
  limit: 10,
  total: 13,
  totalPages: 2,
  currentPage: 1,
  isFirstPage: true,
  isLastPage: false
};

const successReponse = {
  status: 'SUCCESS'
};

const getModeSessionOfPatientResponse = {
  data: { data: { id: 'string', createdAt: 'Date', trials }, pagination },
  ...successReponse
};

const getPerformanceSummary = {
  data: {
    bestScores: 34,
    averageScores: 30
  },
  ...successReponse
};

export const uploadFile = {
  type: FILE_TYPE.LEFT_RIGHT_MODE
};

export const loginAdminReponse = {
  data: {
    token: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzRiZTkxNDctMjRlMi00ZTRlLTkwM2QtM2Y0NDY5MTVhYjM0IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJzY29wZSI6WyJhZG1pbjphY2Nlc3MiXSwiaWF0IjoxNzIwMDYyMDA2LCJleHAiOjE3MjAwNjU2MDZ9.pZRkhIGahX8FVaJ5pCBxuBSfoOzDEV3sXGEzcauLMHw',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzRiZTkxNDctMjRlMi00ZTRlLTkwM2QtM2Y0NDY5MTVhYjM0IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJzY29wZSI6WyJyZWZyZXNoIl0sImlhdCI6MTcyMDA2MjAwNiwiZXhwIjoxNzIwMDY1ODA2fQ.mN9FoLY5rdXSphhz5RI6URJ691unibI7iUi4h1NiLLc'
    },
    userDetail: {
      id: '34be9147-24e2-4e4e-903d-3f446915ab34',
      email: 'admin@gmail.com',
      userName: 'Prism Neuro',
      firstName: null,
      lastName: null,
      createdAt: '2024-07-04T02:35:27.666Z',
      updatedAt: '2024-07-04T02:35:27.666Z',
      deletedAt: null,
      role: 'ADMIN'
    }
  },
  ...successReponse
};

const statisticsMode = {
  data: [
    {
      id: 'e09e201d-2e3e-48ce-9f2d-901d05af1c91',
      type: 'BALANCE_MODE',
      data: 25,
      createdAt: '2024-07-09T08:15:45.523Z'
    }
  ],
  ...successReponse
};

export const AdminSchema = {
  createPhysioRequest,
  loginAdminReponse,
  successReponse,
  updatePhysioRequest,
  getModeSessionOfPatientResponse,
  getPerformanceSummary,
  statisticsMode,
  updatePatientRequest,
  uploadFile
};
