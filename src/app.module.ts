import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppCacheModule } from './presentation/modules/cache/cache.module';
import { DatabaseModule } from './presentation/modules/database/database.module';
import { AuthModule } from './presentation/modules/auth/auth.module';
import { UserModule } from './presentation/modules/user/user.module';
import { JobModule } from './presentation/modules/job/job.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AppCacheModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    JobModule,
  ],
})
export class AppModule {}
