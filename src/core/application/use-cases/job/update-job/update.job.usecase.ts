import { NotFoundDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { Job } from 'src/core/domain/jobs/entity/job.entity';
import { JobFactory } from 'src/core/domain/jobs/factory/job.factory';
import { JobInterfaceRepository } from 'src/core/domain/jobs/repository/job.repository.interface';
import { inputUpdateJobDTO, outputUpdateJobDTO } from './update.job.dto';

export class UpdateJobUseCase {
  constructor(private readonly jobRepository: JobInterfaceRepository) {}

  async execute(input: inputUpdateJobDTO): Promise<outputUpdateJobDTO> {
    const job = await this.jobRepository.findOne(input.id);

    if (!job) {
      throw new NotFoundDomainException('Job not found');
    }

    const updatedJob: Job = JobFactory.create({
      id: input.id,
      company_id: job.company_id,
      title: input.title ?? job.title,
      description: input.description ?? job.description,
      workMode: input.workMode ?? job.workMode,
      employmentType: input.employmentType ?? job.employmentType,
      status: input.status ?? job.status,
      salary: input.salary ?? job.salary,
      isActive: input.isActive ?? job.isActive,
    });

    await this.jobRepository.update(updatedJob);

    return updatedJob;
  }
}
