import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import {
  inputCreateCompanyDTO,
  outputCreateCompanyDTO,
} from 'src/core/application/use-cases/company/create-company/create.company.dto';

export class CreateCompanyDto implements inputCreateCompanyDTO {
  @ApiProperty({ example: 'user-uuid' })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ example: 'Empresa S/A' })
  @IsString()
  @IsNotEmpty()
  corporate_reason: string;

  @ApiProperty({ example: '12.345.678/0001-90' })
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({ example: 'Descrição da empresa' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://empresa.com' })
  @IsUrl()
  @IsOptional()
  website?: string | null;

  @ApiProperty({ example: 'https://empresa.com/logo.png' })
  @IsUrl()
  @IsOptional()
  logo_url?: string | null;
}

export class CreateCompanyResponseDto implements outputCreateCompanyDTO {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'user-uuid' })
  user_id: string;

  @ApiProperty({ example: 'Empresa S/A' })
  corporate_reason: string;

  @ApiProperty({ example: '12.345.678/0001-90' })
  cnpj: string;

  @ApiProperty({ example: 'Descrição da empresa' })
  description: string;

  @ApiProperty({ example: 'https://empresa.com' })
  website?: string | null;

  @ApiProperty({ example: 'https://empresa.com/logo.png' })
  logo_url?: string | null;
}
