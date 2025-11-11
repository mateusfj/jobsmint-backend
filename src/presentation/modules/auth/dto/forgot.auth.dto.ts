import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { inputForgotAuthDTO } from 'src/core/application/use-cases/auth/forgot/forgot.auth.dto';

export class ForgotAuthDto implements inputForgotAuthDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
