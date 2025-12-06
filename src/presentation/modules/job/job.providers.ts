import { CreateJobUseCase } from 'src/core/application/use-cases/job/create-job/create.job.usecase';
import { DeleteJobUseCase } from 'src/core/application/use-cases/job/delete-job/delete.job.usecase';
import { GetAllJobsUseCase } from 'src/core/application/use-cases/job/get-all-jobs/get.all.job.usecase';
import { GetOneJobUseCase } from 'src/core/application/use-cases/job/get-one-job/get-one.job.usecase';
import { UpdateJobUseCase } from 'src/core/application/use-cases/job/update-job/update.job.usecase';
import { COMPANY_REPOSITORY_INTERFACE } from 'src/core/domain/company/repository/company.repository.interface';
import { JOB_REPOSITORY_INTERFACE } from 'src/core/domain/jobs/repository/job.repository.interface';
import { CompanyRepository } from 'src/infrastructure/repositories/typeorm/companies/companies.repository';
import { JobRepository } from 'src/infrastructure/repositories/typeorm/jobs/job.repository';
import { TYPEORM_SERVICES_PROVIDERS } from 'src/infrastructure/repositories/typeorm/services/typeorm-services.providers';

export const JOB_PROVIDERS = [
  ...TYPEORM_SERVICES_PROVIDERS,
  JobRepository,
  {
    provide: JOB_REPOSITORY_INTERFACE,
    useClass: JobRepository,
  },
  {
    provide: CreateJobUseCase,
    useFactory: (
      jobRepository: JobRepository,
      companyRepository: CompanyRepository,
    ) => {
      return new CreateJobUseCase(jobRepository, companyRepository);
    },
    inject: [JOB_REPOSITORY_INTERFACE, COMPANY_REPOSITORY_INTERFACE],
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
