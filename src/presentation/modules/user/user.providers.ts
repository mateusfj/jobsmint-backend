import {
  USER_REPOSITORY_INTERFACE,
  UserInterfaceRepository,
} from 'src/core/domain/entities/user/repository/user.repository.interface';

import { UserRepository } from 'src/infrastructure/repositories/user/typeorm/user.repository';
import { UpdatePasswordUserUseCase } from 'src/core/application/use-cases/user/update-password/update-password.user.usecase';
import { CreateUserUseCase } from 'src/core/application/use-cases/user/create-user/create.user.usecase';

export const PROVIDERS = [
  UserRepository,
  {
    provide: USER_REPOSITORY_INTERFACE,
    useClass: UserRepository,
  },
  {
    provide: CreateUserUseCase,
    useFactory: (userRepository: UserInterfaceRepository) => {
      return new CreateUserUseCase(userRepository);
    },
    inject: [USER_REPOSITORY_INTERFACE],
  },
  {
    provide: UpdatePasswordUserUseCase,
    useFactory: (userRepository: UserInterfaceRepository) => {
      return new UpdatePasswordUserUseCase(userRepository);
    },
    inject: [USER_REPOSITORY_INTERFACE],
  },
];
