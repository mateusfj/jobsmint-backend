import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { QueryParams } from 'src/core/application/@shared/interfaces/query-params/query-params.interface';

export class QueryParamsDto implements QueryParams {
  @IsOptional()
  @IsString()
  select?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  orderBy?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  filter?: Record<string, Record<string, any>>;

  @IsOptional()
  @IsString()
  relations?: string;
}
