import { UserInterfaceRepository } from 'src/core/domain/entities/user/repository/user.repository.interface';
import { inputForgotAuthDTO, outputForgotAuthDTO } from './forgot.auth.dto';
import { JwtInterface, JwtTokenType } from 'src/core/shared/jwt/jwt.interface';
import { NotFoundDomainException } from 'src/core/shared/exceptions/domain.exceptions';

export class ForgotAuthUseCase {
  constructor(
    private readonly userRepository: UserInterfaceRepository,
    private readonly jwtService: JwtInterface,
  ) {}
  async execute(input: inputForgotAuthDTO): Promise<outputForgotAuthDTO> {
    const user = await this.userRepository.findByEmail(input.email);

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
