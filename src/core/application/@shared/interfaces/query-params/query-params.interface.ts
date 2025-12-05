export interface QueryParams {
  select?: string;
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  filter?: Record<string, Record<string, any>>;
  relations?: string;
}

export interface QueryParamsGetOne {
  select?: string;
  relations?: string;
}
