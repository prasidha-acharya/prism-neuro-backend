export interface IPaginateResponse<T> {
  pagination: {
    limit: number;
    total: number;
    totalPages: number;
    currentPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
  };
  data: T;
}
