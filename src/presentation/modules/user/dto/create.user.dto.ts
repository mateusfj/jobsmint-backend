import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { inputCreateUserDTO } from 'src/core/application/use-cases/user/create-user/create.user.dto';

import { ERole } from 'src/core/shared/utils/enums/ERole';

export class CreateUserDto implements inputCreateUserDTO {
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
