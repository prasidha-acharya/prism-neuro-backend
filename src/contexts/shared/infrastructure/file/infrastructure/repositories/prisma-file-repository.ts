import { File, PrismaClient } from '@prisma/client';
import { ICreateFileRequest, IGetFileRequest } from '../../domain/interface/file-request.interface';
import { IFileRepository } from '../../domain/repositories/file.repository';

export class PrismaFileRepository implements IFileRepository {
  constructor(private db: PrismaClient) {}

  async getFiles({ type, isLeftMode, isRightMode }: IGetFileRequest): Promise<File[] | null> {
    return await this.db.file.findMany({
      where: { type, isLeftMode, isRightMode }
    });
  }

  async createFile(requests: ICreateFileRequest[]): Promise<void> {
    await this.db.file.createMany({
      data: requests
    });
  }
}
