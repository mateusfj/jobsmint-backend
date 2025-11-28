import { JwtSignOptions } from '@nestjs/jwt';

export enum JwtTokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
  RESET_PASSWORD = 'reset_password',
}

export interface BaseJwtPayload {
  sub: string;
  type: JwtTokenType;
}

export interface AccessTokenPayload extends BaseJwtPayload {
  name: string;
  email: string;
  role: string;
}

export interface RefreshTokenPayload extends BaseJwtPayload {
  email: string;
}

export interface ResetPasswordPayload extends BaseJwtPayload {
  email: string;
}

export interface JwtInterface {
  sign<T extends object>(payload: T, options?: JwtSignOptions): Promise<string>;
  verify<T extends object>(token: string): Promise<T>;
}

export const JWT_INTERFACE: unique symbol = Symbol('IJwtInterface');
