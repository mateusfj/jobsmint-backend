import * as bcrypt from 'bcrypt';
import { UserInterfaceRepository } from 'src/core/domain/entities/user/repository/user.repository.interface';
import { inputLoginAuthDTO, outputLoginAuthDTO } from './login.auth.dto';
import { JwtInterface } from 'src/core/shared/jwt/jwt.interface';
import { CacheInterface } from 'src/core/shared/repository/cache.interface';
import {
  NotFoundDomainException,
  UnauthorizedDomainException,
} from 'src/core/shared/exceptions/domain.exceptions';
import { GenerateTokens } from 'src/core/shared/jwt/jwt.generate-tokens';

export class LoginAuthUseCase {
  constructor(
    private readonly userRepository: UserInterfaceRepository,
    private readonly jwtService: JwtInterface,
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

    const tokenGenerator = new GenerateTokens(this.jwtService, user);
    const tokens = await tokenGenerator.generateTokens();

    await this.cacheService.set(
      `refresh_token_${user.id}`,
      tokens.refreshToken,
    );

    return tokens;
  }
}
