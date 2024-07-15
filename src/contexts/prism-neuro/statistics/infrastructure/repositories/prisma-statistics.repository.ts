import { PrismaClient } from '@prisma/client';
import { IGetAllUsersStatisticsRequest } from '../../domain/interface/statistics-request.interface';
import { IStatisticsRepository } from '../../domain/repositories/statistics.repository';

export class PrismaStatisticsRepository implements IStatisticsRepository {
  constructor(private db: PrismaClient) {}

  getDashBoardUserStatistics(request: IGetAllUsersStatisticsRequest): Promise<any> {
    console.log(request);
    throw new Error('Method not implemented.');
  }
}
