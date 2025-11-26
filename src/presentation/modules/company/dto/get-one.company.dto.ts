import { ApiProperty } from '@nestjs/swagger';
import { inputGetOneCompanyDTO } from 'src/core/application/use-cases/company/get-one-company/get-one.company.dto';

export class GetOneCompanyOutputDto implements inputGetOneCompanyDTO {
  @ApiProperty({ example: 'uuid' })
  id: string;
}
