import { FILE_TYPE } from '@prisma/client';

export interface ICreateFileRequest {
  name: string;
  url: string;
  type: FILE_TYPE;
}
