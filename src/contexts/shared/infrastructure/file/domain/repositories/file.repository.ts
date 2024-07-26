import { ICreateFileRequest } from '../interface/file-request.interface';

export interface IFileRepository {
  createFile(request: ICreateFileRequest[]): Promise<void>;
}
