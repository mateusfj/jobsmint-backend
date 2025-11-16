import { User } from 'src/core/domain/entities/user/entity/user.entity';

export interface TokenServiceInterface {
  generateAccessToken(user: User): Promise<string>;
  generateRefreshToken(user: User): Promise<string>;
  generateResetPasswordToken(user: User): Promise<string>;
  verifyToken<T extends object>(token: string): Promise<T>;
}

export const TOKEN_SERVICE_INTERFACE = Symbol('TokenServiceInterface');
