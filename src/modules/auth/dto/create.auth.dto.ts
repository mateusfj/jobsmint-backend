import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { inputCreateAuthDTO } from 'src/core/application/use-cases/auth/create/create.auth.dto';
import { ERole } from 'src/shared/enums/ERole';

export class CreateAuthDto implements inputCreateAuthDTO {
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
