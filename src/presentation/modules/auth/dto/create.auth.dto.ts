import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {
  inputRegisterUserAuthDTO,
  outputRegisterUserAuthDTO,
} from 'src/core/application/use-cases/auth/register/register.auth.dto';

import { ERole } from 'src/core/shared/utils/enums/ERole';

export class RegisterUserAuthDto implements inputRegisterUserAuthDTO {
  @ApiProperty({
    example: 'Jonh Doe',
    description: 'Nome do usuário',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'email@example.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'user',
    description:
      'Cargo do usuário que pode ser user, admin, recruiter ou company',
  })
  @IsEnum(ERole)
  @IsString()
  @IsNotEmpty()
  role: ERole;
}

export class ResponseRegisterUserAuthDto implements outputRegisterUserAuthDTO {
  @ApiProperty({
    example: 'uuid',
    description: 'ID do usuário',
  })
  id: string;

  @ApiProperty({
    example: 'Jonh Doe',
    description: 'Nome do usuário',
  })
  name: string;

  @ApiProperty({
    example: 'email@example.com',
    description: 'Email do usuário',
  })
  email: string;

  @ApiProperty({
    example: 'user',
    description:
      'Cargo do usuário que pode ser user, admin, recruiter ou company',
  })
  role: ERole;

  @ApiProperty({
    example: true,
    description: 'Indica se o usuário está ativo',
  })
  isActive: boolean;
}
