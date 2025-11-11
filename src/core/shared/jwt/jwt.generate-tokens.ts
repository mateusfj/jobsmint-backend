import { User } from 'src/core/domain/entities/user/entity/user.entity';
import { JwtInterface, JwtTokenType } from './jwt.interface';

export class GenerateTokens {
  email: string;
  role: string;
  id: string;

  constructor(
    private readonly jwtService: JwtInterface,
    user: User,
  ) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
  }

  async generateTokens(): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const accessToken = await this.jwtService.sign(
      {
        email: this.email,
        role: this.role,
        type: JwtTokenType.ACCESS,
      },
      {
        subject: this.id,
        expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
      },
    );
    const refreshToken = await this.jwtService.sign(
      {
        email: this.email,
        role: this.role,
        type: JwtTokenType.REFRESH,
      },
      {
        subject: this.id,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      },
    );

    return { accessToken, refreshToken };
  }
}
