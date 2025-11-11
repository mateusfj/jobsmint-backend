import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { inputRegisterUserAuthDTO } from 'src/core/application/use-cases/auth/register/register.auth.dto';

import { ERole } from 'src/shared/enums/ERole';

export class RegisterUserAuthDto implements inputRegisterUserAuthDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ERole)
  @IsString()
  @IsNotEmpty()
  role: ERole;
}
