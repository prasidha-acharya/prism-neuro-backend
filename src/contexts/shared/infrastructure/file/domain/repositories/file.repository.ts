import { File } from '@prisma/client';
import { ICreateFileRequest, IGetFileRequest } from '../interface/file-request.interface';

export interface IFileRepository {
  createFile(request: ICreateFileRequest[]): Promise<void>;
  getFiles(request: IGetFileRequest): Promise<File[] | null>;
}
