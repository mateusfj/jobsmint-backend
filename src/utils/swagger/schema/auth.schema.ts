import {
  CreateUserWithCompanyDto,
  CreateUserWithCompanyResponseDto,
} from 'src/presentation/modules/auth/dto/create-user-with-company.auth.dto';
import { ResponseRegisterUserAuthDto } from 'src/presentation/modules/auth/dto/create.auth.dto';
import {
  ForgotAuthDto,
  ResponseForgotAuthDto,
} from 'src/presentation/modules/auth/dto/forgot.auth.dto';
import {
  LoginAuthDTO,
  ResponseLoginAuthDTO,
} from 'src/presentation/modules/auth/dto/login.auth.dto';
import {
  RefreshTokenAuthDTO,
  ResponseRefreshTokenAuthDTO,
} from 'src/presentation/modules/auth/dto/refresh-token.auth.dto';
import {
  ResetPasswordAuthDTO,
  ResponseResetPasswordAuthDTO,
} from 'src/presentation/modules/auth/dto/reset-password.auth.dto';

export const AUTH_SCHEMA = {
  register: {
    method: 'post' as const,
    summary: 'Create one user',
    description: 'This function creates one user',
    bodyType: LoginAuthDTO,
    response: [
      {
        status: 201,
        description: 'user created successfully',
        type: ResponseRegisterUserAuthDto,
      },
    ],
  },

  login: {
    method: 'post' as const,
    summary: 'Login user',
    description: 'This function logs in a user',
    bodyType: LoginAuthDTO,
    response: [
      {
        status: 200,
        description: 'user logged in successfully',
        type: ResponseLoginAuthDTO,
      },
    ],
  },

  refresh: {
    method: 'post' as const,
    summary: 'Refresh token',
    description: 'This function refreshes the token',
    bodyType: RefreshTokenAuthDTO,
    response: [
      {
        status: 200,
        description: 'token refreshed successfully',
        type: ResponseRefreshTokenAuthDTO,
      },
    ],
  },

  forgot: {
    method: 'post' as const,
    summary: 'Forgot password',
    description: 'This function sends a password reset email',
    bodyType: ForgotAuthDto,
    response: [
      {
        status: 200,
        description: 'password reset email sent successfully',
        type: ResponseForgotAuthDto,
      },
    ],
  },

  resetPassword: {
    method: 'post' as const,
    summary: 'Reset password',
    description: 'This function resets the user password',
    bodyType: ResetPasswordAuthDTO,
    response: [
      {
        status: 200,
        description: 'password reset successfully',
        type: ResponseResetPasswordAuthDTO,
      },
    ],
  },

  createUserWithCompany: {
    method: 'post' as const,
    summary: 'Register company and user',
    description: 'Create a user with role company and link the company to it',
    bodyType: CreateUserWithCompanyDto,
    response: [
      {
        status: 201,
        description: 'company and user created successfully',
        type: CreateUserWithCompanyResponseDto,
      },
    ],
  },
};
