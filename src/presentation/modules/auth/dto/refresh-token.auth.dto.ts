import { IsJWT, IsNotEmpty, IsString } from 'class-validator';
import { InputRefreshTokenAuthDTO } from 'src/core/application/use-cases/auth/refresh-token/refresh-token.auth.dto';

export class RefreshTokenAuthDTO implements InputRefreshTokenAuthDTO {
  @IsJWT()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
