import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobModel } from 'src/infrastructure/repositories/typeorm/jobs/job.model';
import { CompanyModule } from '../company/company.module';
import { JobController } from './job.controller';
import { JOB_PROVIDERS } from './job.providers';

@Module({
  imports: [TypeOrmModule.forFeature([JobModel]), CompanyModule],
  controllers: [JobController],
  providers: [...JOB_PROVIDERS],
})
export class JobModule {}
