import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  inputForgotAuthDTO,
  outputForgotAuthDTO,
} from 'src/core/application/use-cases/auth/forgot/forgot.auth.dto';

export class ForgotAuthDto implements inputForgotAuthDTO {
  @ApiProperty({
    example: 'email@example.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class ResponseForgotAuthDto implements outputForgotAuthDTO {
  @ApiProperty({
    example: 'jwt.reset.token.here',
    description: 'Token de reset de senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  resetToken: string;
}
