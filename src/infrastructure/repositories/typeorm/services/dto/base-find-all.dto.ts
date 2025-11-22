import { Type } from 'class-transformer';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { QueryParams } from 'src/core/shared/interfaces/query-params/query-params.interface';

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
  page: number;

  @IsOptional()
  @Type(() => Number)
  limit: number;
}
