import { Job } from 'src/core/domain/entities/jobs/entity/job.entity';
import { inputUpdateJobDTO, outputUpdateJobDTO } from './update.job.dto';
import { JobFactory } from 'src/core/domain/entities/jobs/factory/job.factory';
import { NotFoundDomainException } from 'src/core/shared/exceptions/domain.exceptions';
import { JobInterfaceRepository } from 'src/core/domain/entities/jobs/repository/job.repository.interface';

export class UpdateJobUseCase {
  constructor(private readonly jobRepository: JobInterfaceRepository) {}

  async execute(input: inputUpdateJobDTO): Promise<outputUpdateJobDTO> {
    const job = await this.jobRepository.findOne(input.id);

    if (!job) {
      throw new NotFoundDomainException('Job not found');
    }

    const updatedJob: Job = JobFactory.create({
      id: input.id,
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
