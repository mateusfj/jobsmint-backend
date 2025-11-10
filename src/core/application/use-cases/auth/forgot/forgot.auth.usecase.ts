import { AuthInterfaceRepository } from 'src/core/domain/entities/auth/repository/auth.repository.interface';
import { inputForgotAuthDTO, outputForgotAuthDTO } from './forgot.auth.dto';
import {
  JwtInterface,
  JwtTokenType,
} from 'src/core/shared/jwt/jwt.auth.interface';
import { NotFoundDomainException } from 'src/core/shared/exceptions/domain.exceptions';

export class ForgotAuthUseCase {
  constructor(
    private readonly authRepository: AuthInterfaceRepository,
    private readonly jwtService: JwtInterface,
  ) {}
  async execute(input: inputForgotAuthDTO): Promise<outputForgotAuthDTO> {
    const user = await this.authRepository.findByEmail(input.email);

    if (!user) {
      throw new NotFoundDomainException('User not found');
    }

    const resetToken: string = await this.jwtService.sign({
      sub: user.id,
      email: user.email,
      type: JwtTokenType.RESET_PASSWORD,
    });

    return { resetToken };
  }
}
