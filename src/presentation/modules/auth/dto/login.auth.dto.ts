import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  inputLoginAuthDTO,
  outputLoginAuthDTO,
} from 'src/core/application/use-cases/auth/login/login.auth.dto';

export class LoginAuthDTO implements inputLoginAuthDTO {
  @ApiProperty({
    example: 'email@example.com',
    description: 'Email do usuário',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ResponseLoginAuthDTO implements outputLoginAuthDTO {
  @ApiProperty({
    example: 'jwt.access.token.here',
    description: 'Access token do usuário',
  })
  accessToken: string;

  @ApiProperty({
    example: 'jwt.refresh.token.here',
    description: 'Refresh token do usuário',
  })
  refreshToken: string;
}
