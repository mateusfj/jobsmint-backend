import { JobRepository } from 'src/infrastructure/repositories/typeorm/jobs/jobs.repository';
import { JOB_REPOSITORY_INTERFACE } from 'src/core/domain/jobs/repository/job.repository.interface';
import { CreateJobUseCase } from 'src/core/application/use-cases/job/create-job/create.job.usecase';
import { GetAllJobsUseCase } from 'src/core/application/use-cases/job/get-all-jobs/get.all.job.usecase';
import { UpdateJobUseCase } from 'src/core/application/use-cases/job/update-job/update.job.usecase';
import { DeleteJobUseCase } from 'src/core/application/use-cases/job/delete-job/delete.job.usecase';
import { GetOneJobUseCase } from 'src/core/application/use-cases/job/get-one-job/get-one.job.usecase';
import { BaseFindAllService } from 'src/infrastructure/repositories/typeorm/services/base-find-all.service';
import { BaseFindOneService } from 'src/infrastructure/repositories/typeorm/services/base-find-one.service';

export const JOB_PROVIDERS = [
  BaseFindAllService,
  BaseFindOneService,
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
  {
    provide: GetOneJobUseCase,
    useFactory: (jobRepository: JobRepository) => {
      return new GetOneJobUseCase(jobRepository);
    },
    inject: [JOB_REPOSITORY_INTERFACE],
  },
  {
    provide: UpdateJobUseCase,
    useFactory: (jobRepository: JobRepository) => {
      return new UpdateJobUseCase(jobRepository);
    },
    inject: [JOB_REPOSITORY_INTERFACE],
  },
  {
    provide: DeleteJobUseCase,
    useFactory: (jobRepository: JobRepository) => {
      return new DeleteJobUseCase(jobRepository);
    },
    inject: [JOB_REPOSITORY_INTERFACE],
  },
];
