import { FILE_TYPE } from '@prisma/client';

export interface ICreateFileRequest {
  name: string;
  url: string;
  type: FILE_TYPE;
}

export interface IFileRequest {
  type: FILE_TYPE;
}

export interface IGetFileRequest {
  type: FILE_TYPE;
  isLeftMode?: true;
  isRightMode?: true;
}
