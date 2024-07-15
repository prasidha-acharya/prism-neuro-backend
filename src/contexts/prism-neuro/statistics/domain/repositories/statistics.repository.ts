import { IGetAllUsersStatisticsRequest } from '../interface/statistics-request.interface';

export interface IStatisticsRepository {
  getDashBoardUserStatistics(request: IGetAllUsersStatisticsRequest): Promise<any>;
}
