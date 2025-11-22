export interface QueryParams {
  select?: string;
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface QueryParamsGetOne {
  select?: string;
}
