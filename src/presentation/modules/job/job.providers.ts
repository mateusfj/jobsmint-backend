import { JobRepository } from 'src/infrastructure/repositories/jobs/typeorm/jobs.repository';
import { JOB_REPOSITORY_INTERFACE } from 'src/core/domain/entities/jobs/repository/job.repository.interface';
import { CreateJobUseCase } from 'src/core/application/use-cases/job/create-job/create.job.usecase';
import { GetAllJobsUseCase } from 'src/core/application/use-cases/job/get-all-jobs/get.all.job.usecase';

export const JOB_PROVIDERS = [
  JobRepository,
  {
    provide: JOB_REPOSITORY_INTERFACE,
    useClass: JobRepository,
  },
  {
    provide: CreateJobUseCase,
    useFactory: (jobRepository: JobRepository) => {
      return new CreateJobUseCase(jobRepository);
    },
    inject: [JOB_REPOSITORY_INTERFACE],
  },
  {
    provide: GetAllJobsUseCase,
    useFactory: (jobRepository: JobRepository) => {
      return new GetAllJobsUseCase(jobRepository);
    },
    inject: [JOB_REPOSITORY_INTERFACE],
  },
];
