import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  JwtInterface,
  RefreshTokenPayload,
} from 'src/core/shared/jwt/jwt.interface';

@Injectable()
export class JwtAuth implements JwtInterface {
  constructor(private jwtService: JwtService) {}

  async sign(payload: object, options: object): Promise<string> {
    const token = await this.jwtService.signAsync(
      { ...payload },
      {
        ...options,
      },
    );
    return token;
  }

  async verify(token: string): Promise<RefreshTokenPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }
}
