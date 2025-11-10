import * as bcrypt from 'bcrypt';

import {
  inputResetPasswordAuthDTO,
  outputResetPasswordAuthDTO,
} from './reset-password.auth.dto';
import { AuthInterfaceRepository } from 'src/core/domain/entities/auth/repository/auth.repository.interface';
import {
  JwtInterface,
  JwtTokenType,
} from 'src/core/shared/jwt/jwt.auth.interface';
import {
  NotFoundDomainException,
  ValidationDomainException,
} from 'src/core/shared/exceptions/domain.exceptions';

export class ResetPasswordAuthUseCase {
  constructor(
    private readonly authRepository: AuthInterfaceRepository,
    private readonly jwtService: JwtInterface,
  ) {}
  async execute(
    input: inputResetPasswordAuthDTO,
  ): Promise<outputResetPasswordAuthDTO> {
    const { resetToken, newPassword } = input;

    const decoded = await this.jwtService.verify(resetToken);

    if (!decoded) {
      throw new ValidationDomainException('Invalid or expired token');
    }

    if (decoded.type !== JwtTokenType.RESET_PASSWORD) {
      throw new ValidationDomainException('Invalid token payload');
    }

    const user = await this.authRepository.findOne(decoded.sub);

    if (!user) {
      throw new NotFoundDomainException('User not found');
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await this.authRepository.update(user);

    return { message: 'Password reset successfully' };
  }
}
