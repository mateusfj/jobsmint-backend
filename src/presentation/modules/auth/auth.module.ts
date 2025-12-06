import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TOKEN_SERVICE_INTERFACE } from 'src/core/application/@shared/interfaces/token/token.service.interface';
import { CompanyModel } from 'src/infrastructure/repositories/typeorm/companies/companies.model';
import { UserModel } from 'src/infrastructure/repositories/typeorm/user/user.model';
import { AppCacheModule } from '../cache/cache.module';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { PROVIDERS } from './auth.providers';

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
  exports: [AuthGuard, TOKEN_SERVICE_INTERFACE],
})
export class AuthModule {}
