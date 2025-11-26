import { ApiProperty } from '@nestjs/swagger';
import { outputDeleteCompanyDTO } from 'src/core/application/use-cases/company/delete-company/delete.company.dto';

export class DeleteCompanyResponseDto implements outputDeleteCompanyDTO {
  @ApiProperty({ example: 'Company deleted successfully' })
  message: string;
}
