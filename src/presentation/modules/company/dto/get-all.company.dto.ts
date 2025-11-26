import { ApiProperty } from '@nestjs/swagger';
import { QueryParamsDto } from 'src/infrastructure/repositories/typeorm/services/dto/base-find-all.dto';

export class GetAllCompaniesQueryDto extends QueryParamsDto {}

export class GetAllCompaniesOutputDto {
  @ApiProperty()
  id: string;
}
