import { Body, Controller, Post } from '@nestjs/common';

import { UpdatePasswordUserDTO } from './dto/reset-password.user.dto';
import { CreateUserUseCase } from 'src/core/application/use-cases/user/create/create.user.usecase';
import {
  inputCreateUserDTO,
  outputCreateUserDTO,
} from 'src/core/application/use-cases/user/create/create.user.dto';

import { outputResetPasswordAuthDTO } from 'src/core/application/use-cases/auth/reset-password/reset-password.auth.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdatePasswordUserUseCase } from 'src/core/application/use-cases/user/update-password/update-password.user.usecase';
import { inputUpdatePasswordUserDTO } from 'src/core/application/use-cases/user/update-password/update-password.user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updatePasswordUserUseCase: UpdatePasswordUserUseCase,
  ) {}

  @Post('/')
  async create(@Body() body: CreateUserDto): Promise<outputCreateUserDTO> {
    const inputCreateUserDTO: inputCreateUserDTO = {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
    };
    return await this.createUserUseCase.execute(inputCreateUserDTO);
  }

  @Post('update-password')
  async updatePassword(
    @Body() body: UpdatePasswordUserDTO,
  ): Promise<outputResetPasswordAuthDTO> {
    const inputResetPassword: inputUpdatePasswordUserDTO = {
      userId: body.userId,
      currentPassword: body.currentPassword,
      newPassword: body.newPassword,
    };
    return await this.updatePasswordUserUseCase.execute(inputResetPassword);
  }
}
