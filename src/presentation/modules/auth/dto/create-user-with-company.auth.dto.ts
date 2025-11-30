import { ApiProperty } from '@nestjs/swagger';
import {
  RegisterUserAuthDto,
  ResponseRegisterUserAuthDto,
} from './create.auth.dto';
import { CreateCompanyDto } from '../../company/dto/create.company.dto';

export class CreateUserWithCompanyDto {
  @ApiProperty({ type: RegisterUserAuthDto })
  user: RegisterUserAuthDto;

  @ApiProperty({ type: CreateCompanyDto })
  company: CreateCompanyDto;
}

export class RegisterCompanyResponseDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'user-uuid' })
  owner_id: string;

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

export class CreateUserWithCompanyResponseDto {
  @ApiProperty({ type: RegisterCompanyResponseDto })
  company: RegisterCompanyResponseDto;

  @ApiProperty({ type: ResponseRegisterUserAuthDto })
  user: ResponseRegisterUserAuthDto;
}
