import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ResponseRegisterUserAuthDto } from './create.auth.dto';

export class CreateUserWithCompanyDto {
  @ApiProperty({ example: 'Nome da empresa' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'contato@empresa.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'senhaSegura123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

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

export class RegisterCompanyResponseDto {
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

export class CreateUserWithCompanyResponseDto {
  @ApiProperty({ type: [RegisterCompanyResponseDto] })
  company: RegisterCompanyResponseDto;

  @ApiProperty({ type: [ResponseRegisterUserAuthDto] })
  user: ResponseRegisterUserAuthDto;
}
