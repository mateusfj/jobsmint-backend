import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';
import {
  inputResetPasswordAuthDTO,
  outputResetPasswordAuthDTO,
} from 'src/core/application/use-cases/auth/reset-password/reset-password.auth.dto';

export class ResetPasswordAuthDTO implements inputResetPasswordAuthDTO {
  @ApiProperty({
    example: 'jwt.reset.token.here',
    description: 'Token de reset de senha do usuário',
  })
  @IsJWT()
  @IsString()
  @IsNotEmpty()
  resetToken: string;

  @ApiProperty({
    example: 'newSecurePassword123',
    description: 'Nova senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({
    example: 'currentPassword123',
    description: 'Senha atual do usuário',
  })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;
}

export class ResponseResetPasswordAuthDTO
  implements outputResetPasswordAuthDTO
{
  @ApiProperty({
    example: 'Password reset successfully',
    description: 'Mensagem de sucesso',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
