import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { PROVIDERS } from './auth.providers';
import { UserModel } from 'src/infrastructure/repositories/typeorm/user/user.model';
import { AppCacheModule } from '../cache/cache.module';
import { UserModule } from '../user/user.module';
import { CompanyModule } from '../company/company.module';
import { CompanyModel } from 'src/infrastructure/repositories/typeorm/companies/companies.model';

@Module({
  imports: [
    AppCacheModule,
    TypeOrmModule.forFeature([UserModel, CompanyModel]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
    UserModule,
    CompanyModule,
  ],
  controllers: [AuthController],
  providers: [...PROVIDERS],
})
export class AuthModule {}
