import { IsOptional, IsString } from 'class-validator';

export class QueryParamsGetOne {
  @IsOptional()
  @IsString()
  select?: string;

  @IsOptional()
  @IsString()
  relations?: string;
}
