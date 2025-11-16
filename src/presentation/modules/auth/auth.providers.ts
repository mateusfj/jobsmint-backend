import { ForgotAuthUseCase } from 'src/core/application/use-cases/auth/forgot/forgot.auth.usecase';
import { LoginAuthUseCase } from 'src/core/application/use-cases/auth/login/login.auth.usecase';
import { RefreshTokenUseCase } from 'src/core/application/use-cases/auth/refresh-token/refresh-token.auth.usecase';
import { ResetPasswordAuthUseCase } from 'src/core/application/use-cases/auth/reset-password/reset-password.auth.usecase';
import {
  USER_REPOSITORY_INTERFACE,
  UserInterfaceRepository,
} from 'src/core/domain/entities/user/repository/user.repository.interface';
import {
  JWT_INTERFACE,
  JwtInterface,
} from 'src/core/shared/interfaces/jwt/jwt.interface';
import {
  CACHE_INTERFACE,
  CacheInterface,
} from 'src/core/shared/interfaces/cache/cache.interface';
import { JwtAuth } from 'src/infrastructure/providers/auth/jwt/jwt.service';
import { CacheRedis } from 'src/infrastructure/providers/cache/redis/cache.redis';
import { UserRepository } from 'src/infrastructure/repositories/user/typeorm/user.repository';
import { RegisterUserUseCase } from 'src/core/application/use-cases/auth/register/register.auth.usecase';
import { UpdatePasswordUserUseCase } from 'src/core/application/use-cases/user/update-password/update-password.user.usecase';
import { CreateUserUseCase } from 'src/core/application/use-cases/user/create-user/create.user.usecase';

import { TokenService } from 'src/core/application/services/token.service';
import { JwtService } from '@nestjs/jwt';
import {
  TOKEN_SERVICE_INTERFACE,
  TokenServiceInterface,
} from 'src/core/application/shared/interfaces/token/token.service.interface';

export const PROVIDERS = [
  UserRepository,
  JwtService,
  {
    provide: USER_REPOSITORY_INTERFACE,
    useClass: UserRepository,
  },
  {
    provide: TOKEN_SERVICE_INTERFACE,
    useFactory: (jwtService: JwtInterface) => {
      return new TokenService(jwtService);
    },
    inject: [JWT_INTERFACE],
  },
  {
    provide: CACHE_INTERFACE,
    useClass: CacheRedis,
  },
  {
    provide: JWT_INTERFACE,
    useClass: JwtAuth,
  },
  {
    provide: RegisterUserUseCase,
    useFactory: (createUserUseCase: CreateUserUseCase) => {
      return new RegisterUserUseCase(createUserUseCase);
    },
    inject: [CreateUserUseCase],
  },
  {
    provide: RefreshTokenUseCase,
    useFactory: (
      userRepository: UserInterfaceRepository,
      tokenService: TokenServiceInterface,
      cacheService: CacheInterface,
    ) => {
      return new RefreshTokenUseCase(
        userRepository,
        tokenService,
        cacheService,
      );
    },
    inject: [
      USER_REPOSITORY_INTERFACE,
      TOKEN_SERVICE_INTERFACE,
      CACHE_INTERFACE,
    ],
  },
  {
    provide: LoginAuthUseCase,
    useFactory: (
      userRepository: UserInterfaceRepository,
      tokenService: TokenServiceInterface,
      cacheService: CacheInterface,
    ) => {
      return new LoginAuthUseCase(userRepository, tokenService, cacheService);
    },
    inject: [
      USER_REPOSITORY_INTERFACE,
      TOKEN_SERVICE_INTERFACE,
      CACHE_INTERFACE,
    ],
  },
  {
    provide: ForgotAuthUseCase,
    useFactory: (
      userRepository: UserInterfaceRepository,
      tokenService: TokenServiceInterface,
    ) => {
      return new ForgotAuthUseCase(userRepository, tokenService);
    },
    inject: [USER_REPOSITORY_INTERFACE, TOKEN_SERVICE_INTERFACE],
  },
  {
    provide: ResetPasswordAuthUseCase,
    useFactory: (
      updatePasswordUserUseCase: UpdatePasswordUserUseCase,
      tokenService: TokenServiceInterface,
    ) => {
      return new ResetPasswordAuthUseCase(
        updatePasswordUserUseCase,
        tokenService,
      );
    },
    inject: [UpdatePasswordUserUseCase, TOKEN_SERVICE_INTERFACE],
  },
];
