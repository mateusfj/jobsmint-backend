import { ForgotAuthUseCase } from 'src/core/application/use-cases/auth/forgot/forgot.auth.usecase';
import { LoginAuthUseCase } from 'src/core/application/use-cases/auth/login/login.auth.usecase';
import { RefreshTokenUseCase } from 'src/core/application/use-cases/auth/refresh-token/refresh-token.auth.usecase';
import { ResetPasswordAuthUseCase } from 'src/core/application/use-cases/auth/reset-password/reset-password.auth.usecase';
import {
  USER_REPOSITORY_INTERFACE,
  UserInterfaceRepository,
} from 'src/core/domain/entities/user/repository/user.repository.interface';
import { JWT_INTERFACE, JwtInterface } from 'src/core/shared/jwt/jwt.interface';
import {
  CACHE_INTERFACE,
  CacheInterface,
} from 'src/core/shared/repository/cache.interface';
import { JwtAuth } from 'src/infrastructure/providers/auth/jwt/jwt.service';
import { CacheRedis } from 'src/infrastructure/providers/cache/redis/cache.redis';
import { UserRepository } from 'src/infrastructure/repositories/user/typeorm/user.repository';
import { RegisterUserUseCase } from 'src/core/application/use-cases/auth/register/register.auth.usecase';
import { UpdatePasswordUserUseCase } from 'src/core/application/use-cases/user/update-password/update-password.user.usecase';
import { CreateUserUseCase } from 'src/core/application/use-cases/user/create-user/create.user.usecase';

export const PROVIDERS = [
  UserRepository,
  {
    provide: USER_REPOSITORY_INTERFACE,
    useClass: UserRepository,
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
      jwtService: JwtInterface,
      cacheService: CacheInterface,
    ) => {
      return new RefreshTokenUseCase(userRepository, jwtService, cacheService);
    },
    inject: [USER_REPOSITORY_INTERFACE, JWT_INTERFACE, CACHE_INTERFACE],
  },
  {
    provide: LoginAuthUseCase,
    useFactory: (
      userRepository: UserInterfaceRepository,
      jwtService: JwtInterface,
      cacheService: CacheInterface,
    ) => {
      return new LoginAuthUseCase(userRepository, jwtService, cacheService);
    },
    inject: [USER_REPOSITORY_INTERFACE, JWT_INTERFACE, CACHE_INTERFACE],
  },
  {
    provide: ForgotAuthUseCase,
    useFactory: (
      userRepository: UserInterfaceRepository,
      jwtService: JwtInterface,
    ) => {
      return new ForgotAuthUseCase(userRepository, jwtService);
    },
    inject: [USER_REPOSITORY_INTERFACE, JWT_INTERFACE],
  },
  {
    provide: ResetPasswordAuthUseCase,
    useFactory: (
      updatePasswordUserUseCase: UpdatePasswordUserUseCase,
      jwtService: JwtInterface,
    ) => {
      return new ResetPasswordAuthUseCase(
        updatePasswordUserUseCase,
        jwtService,
      );
    },
    inject: [UpdatePasswordUserUseCase, JWT_INTERFACE],
  },
];
