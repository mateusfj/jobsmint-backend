import { User } from 'src/core/domain/user/entity/user.entity';
import {
  AccessTokenPayload,
  JwtInterface,
  JwtTokenType,
  RefreshTokenPayload,
  ResetPasswordPayload,
} from 'src/core/application/@shared/interfaces/jwt/jwt.interface';

export class TokenService {
  constructor(private readonly jwtService: JwtInterface) {}

  async generateAccessToken(user: User): Promise<string> {
    return this.jwtService.sign<AccessTokenPayload>(
      {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        type: JwtTokenType.ACCESS,
      },
      {
        expiresIn: Number(process.env.TOKEN_EXPIRES_IN) || '1h',
      },
    );
  }

  async generateRefreshToken(user: User): Promise<string> {
    return this.jwtService.sign<RefreshTokenPayload>(
      {
        sub: user.id,
        email: user.email,
        type: JwtTokenType.REFRESH,
      },
      {
        expiresIn: Number(process.env.REFRESH_EXPIRES_IN) || '7d',
      },
    );
  }

  async generateResetPasswordToken(user: User): Promise<string> {
    return this.jwtService.sign<ResetPasswordPayload>(
      {
        sub: user.id,
        email: user.email,
        type: JwtTokenType.RESET_PASSWORD,
      },
      {
        expiresIn: Number(process.env.RESET_PASSWORD_EXPIRES_IN) || '1h',
      },
    );
  }

  async verifyToken<T extends object>(token: string): Promise<T> {
    return this.jwtService.verify<T>(token);
  }
}
