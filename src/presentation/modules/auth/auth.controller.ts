import { Body, Controller, Post } from '@nestjs/common';

import { ForgotAuthDto } from './dto/forgot.auth.dto';
import { ResetPasswordAuthDTO } from './dto/reset-password.auth.dto';

import { LoginAuthUseCase } from 'src/core/application/use-cases/auth/login/login.auth.usecase';
import { RefreshTokenUseCase } from 'src/core/application/use-cases/auth/refresh-token/refresh-token.auth.usecase';
import { ForgotAuthUseCase } from 'src/core/application/use-cases/auth/forgot/forgot.auth.usecase';
import { ResetPasswordAuthUseCase } from 'src/core/application/use-cases/auth/reset-password/reset-password.auth.usecase';

import {
  inputLoginAuthDTO,
  outputLoginAuthDTO,
} from 'src/core/application/use-cases/auth/login/login.auth.dto';
import {
  InputRefreshTokenAuthDTO,
  OutputRefreshTokenAuthDTO,
} from 'src/core/application/use-cases/auth/refresh-token/refresh-token.auth.dto';
import {
  inputForgotAuthDTO,
  outputForgotAuthDTO,
} from 'src/core/application/use-cases/auth/forgot/forgot.auth.dto';
import {
  inputResetPasswordAuthDTO,
  outputResetPasswordAuthDTO,
} from 'src/core/application/use-cases/auth/reset-password/reset-password.auth.dto';
import {
  inputRegisterUserAuthDTO,
  outputRegisterUserAuthDTO,
} from 'src/core/application/use-cases/auth/register/register.auth.dto';

import { RegisterUserAuthDto } from './dto/create.auth.dto';
import { RegisterUserUseCase } from 'src/core/application/use-cases/auth/register/register.auth.usecase';
import { LoginAuthDTO } from './dto/login.auth.dto';
import { RefreshTokenAuthDTO } from './dto/refresh-token.auth.dto';
import { AUTH_SCHEMA } from 'src/utils/swagger/schema/auth.schema';
import { SwaggerDocs } from 'src/utils/decorators/swagger.decorator';
import {
  CreateUserWithCompanyResponseDto,
  CreateUserWithCompanyDto,
} from './dto/create-user-with-company.auth.dto';
import { CreateUserWithCompanyUseCase } from 'src/core/application/use-cases/user/create-user-with-company/create-user-with-company.usecase';
import { inputCreateUserWithCompanyDTO } from 'src/core/application/use-cases/user/create-user-with-company/create-user-with-company.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginAuthUseCase: LoginAuthUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly forgotAuthUseCase: ForgotAuthUseCase,
    private readonly resetPasswordAuthUseCase: ResetPasswordAuthUseCase,
    private readonly createUserWithCompanyUseCase: CreateUserWithCompanyUseCase,
  ) {}

  @Post('register')
  @SwaggerDocs(AUTH_SCHEMA.register)
  async create(
    @Body() body: RegisterUserAuthDto,
  ): Promise<outputRegisterUserAuthDTO> {
    const inputCreateAuthDTO: inputRegisterUserAuthDTO = {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
    };
    return await this.registerUserUseCase.execute(inputCreateAuthDTO);
  }

  @Post('login')
  @SwaggerDocs(AUTH_SCHEMA.login)
  async login(@Body() body: LoginAuthDTO): Promise<outputLoginAuthDTO> {
    const inputLoginAuthDTO: inputLoginAuthDTO = {
      email: body.email,
      password: body.password,
    };
    return await this.loginAuthUseCase.execute(inputLoginAuthDTO);
  }

  @Post('refresh')
  @SwaggerDocs(AUTH_SCHEMA.refresh)
  async refreshToken(
    @Body() body: RefreshTokenAuthDTO,
  ): Promise<OutputRefreshTokenAuthDTO> {
    const inputRefreshToken: InputRefreshTokenAuthDTO = {
      refreshToken: body.refreshToken,
    };
    return await this.refreshTokenUseCase.execute(inputRefreshToken);
  }

  @Post('forgot')
  @SwaggerDocs(AUTH_SCHEMA.forgot)
  async forgot(@Body() body: ForgotAuthDto): Promise<outputForgotAuthDTO> {
    const inputForgot: inputForgotAuthDTO = { email: body.email };
    return await this.forgotAuthUseCase.execute(inputForgot);
  }

  @Post('reset-password')
  @SwaggerDocs(AUTH_SCHEMA.resetPassword)
  async resetPassword(
    @Body() body: ResetPasswordAuthDTO,
  ): Promise<outputResetPasswordAuthDTO> {
    const inputResetPassword: inputResetPasswordAuthDTO = {
      resetToken: body.resetToken,
      currentPassword: body.currentPassword,
      newPassword: body.newPassword,
    };
    return await this.resetPasswordAuthUseCase.execute(inputResetPassword);
  }

  @SwaggerDocs(AUTH_SCHEMA.createUserWithCompany)
  @Post('register-company')
  async registerUserWithCompany(
    @Body() body: CreateUserWithCompanyDto,
  ): Promise<CreateUserWithCompanyResponseDto> {
    const input: inputCreateUserWithCompanyDTO = {
      company: {
        owner_id: body.company.owner_id,
        corporate_reason: body.company.corporate_reason,
        fantasy_name: body.company.fantasy_name,
        industry: body.company.industry,
        cnpj: body.company.cnpj,
        address: body.company.address,
        phone: body.company.phone,
      },
      user: {
        name: body.user.name,
        email: body.user.email,
        password: body.user.password,
        role: body.user.role,
      },
    };
    return await this.createUserWithCompanyUseCase.execute(input);
  }
}
