import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';
import {
  InputRefreshTokenAuthDTO,
  OutputRefreshTokenAuthDTO,
} from 'src/core/application/use-cases/auth/refresh-token/refresh-token.auth.dto';

export class RefreshTokenAuthDTO implements InputRefreshTokenAuthDTO {
  @ApiProperty({
    example: 'jwt.refresh.token.here',
    description: 'Refresh token do usuário',
  })
  @IsJWT()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class ResponseRefreshTokenAuthDTO implements OutputRefreshTokenAuthDTO {
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
