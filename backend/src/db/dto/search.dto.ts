import { Pagination } from '@common/pagination';

export interface DbSearchDto {
  where?: string;
  orderBy?: string;
  pagination?: Pagination;
}
