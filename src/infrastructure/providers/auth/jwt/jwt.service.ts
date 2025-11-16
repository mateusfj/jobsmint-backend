import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtInterface } from 'src/core/shared/interfaces/jwt/jwt.interface';

@Injectable()
export class JwtAuth implements JwtInterface {
  constructor(private readonly jwtService: JwtService) {}

  async sign<T extends object>(
    payload: T,
    options?: JwtSignOptions,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      ...options,
      secret: process.env.JWT_SECRET,
    });
  }

  async verify<T extends object>(token: string): Promise<T> {
    return await this.jwtService.verifyAsync<T>(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
