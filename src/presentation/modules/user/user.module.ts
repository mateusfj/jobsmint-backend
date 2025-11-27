import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PROVIDERS } from './user.providers';
import { UserModel } from 'src/infrastructure/repositories/typeorm/user/user.model';
import { UserController } from './user.controller';

import { UpdatePasswordUserUseCase } from 'src/core/application/use-cases/user/update-password/update-password.user.usecase';
import { CreateUserUseCase } from 'src/core/application/use-cases/user/create-user/create.user.usecase';
import { USER_REPOSITORY_INTERFACE } from 'src/core/domain/entities/user/repository/user.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [...PROVIDERS],
  exports: [
    CreateUserUseCase,
    UpdatePasswordUserUseCase,
    USER_REPOSITORY_INTERFACE,
  ],
})
export class UserModule {}
