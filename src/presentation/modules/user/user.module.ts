import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PROVIDERS } from './user.providers';
import { UserModel } from 'src/infrastructure/repositories/user/typeorm/user.model';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'src/core/application/use-cases/user/create/create.user.usecase';
import { UpdatePasswordUserUseCase } from 'src/core/application/use-cases/user/update-password/update-password.user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: PROVIDERS as Provider[],
  exports: [CreateUserUseCase, UpdatePasswordUserUseCase],
})
export class UserModule {}
