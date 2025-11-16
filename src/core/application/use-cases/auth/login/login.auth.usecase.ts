import * as bcrypt from 'bcrypt';
import { UserInterfaceRepository } from 'src/core/domain/entities/user/repository/user.repository.interface';
import { inputLoginAuthDTO, outputLoginAuthDTO } from './login.auth.dto';
import { CacheInterface } from 'src/core/shared/interfaces/cache/cache.interface';
import {
  NotFoundDomainException,
  UnauthorizedDomainException,
} from 'src/core/shared/exceptions/domain.exceptions';
import { TokenServiceInterface } from 'src/core/application/shared/interfaces/token/token.service.interface';

export class LoginAuthUseCase {
  constructor(
    private readonly userRepository: UserInterfaceRepository,
    private readonly tokenService: TokenServiceInterface,
    private readonly cacheService: CacheInterface,
  ) {}

  async execute(
    inputLoginAuthDTO: inputLoginAuthDTO,
  ): Promise<outputLoginAuthDTO> {
    const user = await this.userRepository.findByEmail(inputLoginAuthDTO.email);

    if (!user) {
      throw new NotFoundDomainException('User not found');
    }

    // TODO: criar interface para hash pois ta muito acoplado ao bcrypt
    const comparedHash = await bcrypt.compare(
      inputLoginAuthDTO.password,
      user.password,
    );

    if (!comparedHash) {
      throw new UnauthorizedDomainException('Invalid credentials');
    }

    const accessToken = await this.tokenService.generateAccessToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(user);

    // TODO: mover para um service de refresh token
    await this.cacheService.set(
      `refresh_token_${user.id}`,
      refreshToken,
      Number(process.env.REFRESH_EXPIRES_IN ?? '604800'),
    );

    return { accessToken, refreshToken };
  }
}
