import { CreateAuthUseCase } from 'src/core/application/use-cases/auth/create/create.auth.usecase';
import { ForgotAuthUseCase } from 'src/core/application/use-cases/auth/forgot/forgot.auth.usecase';
import { LoginAuthUseCase } from 'src/core/application/use-cases/auth/login/login.auth.usecase';
import { RefreshTokenUseCase } from 'src/core/application/use-cases/auth/refresh-token/refresh-token.auth.usecase';
import { ResetPasswordAuthUseCase } from 'src/core/application/use-cases/auth/reset-password/reset-password.auth.usecase';
import {
  AUTH_REPOSITORY_INTERFACE,
  AuthInterfaceRepository,
} from 'src/core/domain/entities/auth/repository/auth.repository.interface';
import {
  JWT_INTERFACE,
  JwtInterface,
} from 'src/core/shared/jwt/jwt.auth.interface';
import {
  CACHE_INTERFACE,
  CacheInterface,
} from 'src/core/shared/repository/cache.interface';
import { JwtAuth } from 'src/infrastructure/providers/auth/jwt/jwt.service';
import { CacheRedis } from 'src/infrastructure/providers/cache/redis/cache.redis';
import { AuthRespository } from 'src/infrastructure/repositories/auth/typeorm/auth.repository';

export const PROVIDERS = [
  AuthRespository,
  {
    provide: AUTH_REPOSITORY_INTERFACE,
    useClass: AuthRespository,
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
    provide: CreateAuthUseCase,
    useFactory: (authRepository: AuthInterfaceRepository) => {
      return new CreateAuthUseCase(authRepository);
    },
    inject: [AUTH_REPOSITORY_INTERFACE],
  },
  {
    provide: RefreshTokenUseCase,
    useFactory: (
      authRepository: AuthInterfaceRepository,
      jwtService: JwtInterface,
      cacheService: CacheInterface,
    ) => {
      return new RefreshTokenUseCase(authRepository, jwtService, cacheService);
    },
    inject: [AUTH_REPOSITORY_INTERFACE, JWT_INTERFACE, CACHE_INTERFACE],
  },
  {
    provide: LoginAuthUseCase,
    useFactory: (
      authRepository: AuthInterfaceRepository,
      jwtService: JwtInterface,
      cacheService: CacheInterface,
    ) => {
      return new LoginAuthUseCase(authRepository, jwtService, cacheService);
    },
    inject: [AUTH_REPOSITORY_INTERFACE, JWT_INTERFACE, CACHE_INTERFACE],
  },
  {
    provide: ForgotAuthUseCase,
    useFactory: (
      authRepository: AuthInterfaceRepository,
      jwtService: JwtInterface,
    ) => {
      return new ForgotAuthUseCase(authRepository, jwtService);
    },
    inject: [AUTH_REPOSITORY_INTERFACE, JWT_INTERFACE],
  },
  {
    provide: ResetPasswordAuthUseCase,
    useFactory: (
      authRepository: AuthInterfaceRepository,
      jwtService: JwtInterface,
    ) => {
      return new ResetPasswordAuthUseCase(authRepository, jwtService);
    },
    inject: [AUTH_REPOSITORY_INTERFACE, JWT_INTERFACE],
  },
];
