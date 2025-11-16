import { UserInterfaceRepository } from 'src/core/domain/entities/user/repository/user.repository.interface';
import {
  InputRefreshTokenAuthDTO,
  OutputRefreshTokenAuthDTO,
} from './refresh-token.auth.dto';
import {
  JwtTokenType,
  RefreshTokenPayload,
} from 'src/core/shared/interfaces/jwt/jwt.interface';
import { CacheInterface } from 'src/core/shared/interfaces/cache/cache.interface';
import {
  NotFoundDomainException,
  ValidationDomainException,
} from 'src/core/shared/exceptions/domain.exceptions';
import { TokenServiceInterface } from 'src/core/application/shared/interfaces/token/token.service.interface';

export class RefreshTokenUseCase {
  constructor(
    private readonly userRepository: UserInterfaceRepository,
    private readonly tokenService: TokenServiceInterface,
    private readonly cacheService: CacheInterface,
  ) {}

  async execute(
    input: InputRefreshTokenAuthDTO,
  ): Promise<OutputRefreshTokenAuthDTO> {
    const payload = await this.tokenService.verifyToken<RefreshTokenPayload>(
      input.refreshToken,
    );

    if (!payload || payload.type !== JwtTokenType.REFRESH) {
      throw new ValidationDomainException('Invalid token');
    }

    const storedRefreshToken = await this.cacheService.get<string>(
      `refresh_token_${payload.sub}`,
    );

    if (!storedRefreshToken || storedRefreshToken !== input.refreshToken) {
      throw new ValidationDomainException('Invalid token');
    }

    const user = await this.userRepository.findOne(payload.sub);

    if (!user) {
      throw new NotFoundDomainException('User not found');
    }

    const accessToken = await this.tokenService.generateAccessToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(user);

    // TODO: mover para um service de refresh token
    await this.cacheService.del(`refresh_token_${user.id}`);

    await this.cacheService.set(
      `refresh_token_${user.id}`,
      refreshToken,
      parseInt(process.env.JWT_REFRESH_EXPIRES_IN ?? ''),
    );

    return { accessToken, refreshToken };
  }
}
