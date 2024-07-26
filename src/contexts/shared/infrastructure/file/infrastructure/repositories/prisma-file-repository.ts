import { PrismaClient } from '@prisma/client';
import { ICreateFileRequest } from '../../domain/interface/file-request.interface';
import { IFileRepository } from '../../domain/repositories/file.repository';

export class PrismaFileRepository implements IFileRepository {
  constructor(private db: PrismaClient) {}

  async createFile(requests: ICreateFileRequest[]): Promise<void> {
    await this.db.file.createMany({
      data: requests
    });
  }
}
