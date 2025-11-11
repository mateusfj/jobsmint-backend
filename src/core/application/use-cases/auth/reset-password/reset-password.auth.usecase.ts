import {
  inputResetPasswordAuthDTO,
  outputResetPasswordAuthDTO,
} from './reset-password.auth.dto';

import { JwtInterface, JwtTokenType } from 'src/core/shared/jwt/jwt.interface';
import { ValidationDomainException } from 'src/core/shared/exceptions/domain.exceptions';

import { UpdatePasswordUserUseCase } from '../../user/update-password/update-password.user.usecase';

export class ResetPasswordAuthUseCase {
  constructor(
    private readonly updatePasswordUserUseCase: UpdatePasswordUserUseCase,
    private readonly jwtService: JwtInterface,
  ) {}
  async execute(
    input: inputResetPasswordAuthDTO,
  ): Promise<outputResetPasswordAuthDTO> {
    const { resetToken, newPassword, currentPassword } = input;

    const decoded = await this.jwtService.verify(resetToken);

    if (!decoded) {
      throw new ValidationDomainException('Invalid or expired token');
    }

    if (decoded.type !== JwtTokenType.RESET_PASSWORD) {
      throw new ValidationDomainException('Invalid token payload');
    }

    const response = await this.updatePasswordUserUseCase.execute({
      userId: decoded.sub,
      currentPassword,
      newPassword,
    });

    return response;
  }
}
