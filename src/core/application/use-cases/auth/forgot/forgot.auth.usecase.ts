import { UserInterfaceRepository } from 'src/core/domain/user/repository/user.repository.interface';
import { inputForgotAuthDTO, outputForgotAuthDTO } from './forgot.auth.dto';
import { NotFoundDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { TokenServiceInterface } from 'src/core/application/@shared/interfaces/token/token.service.interface';

export class ForgotAuthUseCase {
  constructor(
    private readonly userRepository: UserInterfaceRepository,
    private readonly tokenService: TokenServiceInterface,
  ) {}
  async execute(input: inputForgotAuthDTO): Promise<outputForgotAuthDTO> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new NotFoundDomainException('User not found');
    }

    const resetToken: string =
      await this.tokenService.generateResetPasswordToken(user);

    return { resetToken };
  }
}
