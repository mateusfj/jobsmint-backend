import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppCacheModule } from './presentation/modules/cache/cache.module';
import { DatabaseModule } from './presentation/modules/database/database.module';
import { AuthModule } from './presentation/modules/auth/auth.module';
import { UserModule } from './presentation/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AppCacheModule,
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
