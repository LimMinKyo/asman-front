import { ResponseDto } from './response.dto';

interface PaginationMeta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
  perPage: number;
}

export interface PaginationRequest {
  page: number;
  perPage?: number;
}

export interface PaginationResponse<T> extends ResponseDto<T[]> {
  meta: PaginationMeta;
}
