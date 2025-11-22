import { IsOptional, IsString } from 'class-validator';

export class QueryParamsGetOne implements QueryParamsGetOne {
  @IsOptional()
  @IsString()
  select?: string;
}
