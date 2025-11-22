import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobModel } from 'src/infrastructure/repositories/typeorm/jobs/jobs.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JOB_PROVIDERS } from './job.providers';

@Module({
  imports: [TypeOrmModule.forFeature([JobModel])],
  controllers: [JobController],
  providers: [...JOB_PROVIDERS],
})
export class JobModule {}
