import { NotFoundDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { CompanyInterfaceRepository } from 'src/core/domain/company/repository/company.repository.interface';
import { Job } from 'src/core/domain/jobs/entity/job.entity';
import { JobFactory } from 'src/core/domain/jobs/factory/job.factory';
import { JobInterfaceRepository } from 'src/core/domain/jobs/repository/job.repository.interface';
import { inputCreateJobDTO, outputCreateJobDTO } from './create.job.dto';

export class CreateJobUseCase {
  constructor(
    private readonly jobRepository: JobInterfaceRepository,
    private readonly companyRepository: CompanyInterfaceRepository,
  ) {}
  async execute(input: inputCreateJobDTO): Promise<outputCreateJobDTO> {
    const company = await this.companyRepository.findOne(input.company_id);

    if (!company) {
      throw new NotFoundDomainException('Company not found');
    }

    const newJob: Job = JobFactory.create({
      company_id: input.company_id,
      title: input.title,
      description: input.description,
      salary: input.salary ?? null,
      workMode: input.workMode,
      employmentType: input.employmentType,
      status: input.status,
      isActive: true,
    });

    await this.jobRepository.create(newJob);

    return {
      id: newJob.id,
      title: newJob.title,
      description: newJob.description,
      salary: newJob.salary,
      workMode: newJob.workMode,
      employmentType: newJob.employmentType,
      status: newJob.status,
    };
  }
}
