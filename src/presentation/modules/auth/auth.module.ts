import { Module, Provider } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { PROVIDERS } from './auth.providers';
import { UserModel } from 'src/infrastructure/repositories/typeorm/user/user.model';
import { AppCacheModule } from '../cache/cache.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    AppCacheModule,
    TypeOrmModule.forFeature([UserModel]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: PROVIDERS as Provider[],
})
export class AuthModule {}
