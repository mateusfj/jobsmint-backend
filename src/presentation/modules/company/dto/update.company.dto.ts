import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { inputUpdateCompanyDTO } from 'src/core/application/use-cases/company/update-company/update.company.dto';

export class UpdateCompanyDto implements inputUpdateCompanyDTO {
  @ApiProperty({ example: 'uuid' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'user-uuid' })
  @IsString()
  @IsOptional()
  user_id?: string;

  @ApiProperty({ example: 'Empresa S/A' })
  @IsString()
  @IsOptional()
  corporate_reason?: string;

  @ApiProperty({ example: '12.345.678/0001-90' })
  @IsString()
  @IsOptional()
  cnpj?: string;

  @ApiProperty({ example: 'Descrição da empresa' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://empresa.com' })
  @IsUrl()
  @IsOptional()
  website?: string | null;

  @ApiProperty({ example: 'https://empresa.com/logo.png' })
  @IsUrl()
  @IsOptional()
  logo_url?: string | null;
}
