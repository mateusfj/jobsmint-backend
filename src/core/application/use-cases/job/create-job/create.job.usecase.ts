import { JobInterfaceRepository } from 'src/core/domain/entities/jobs/repository/job.repository.interface';
import { inputCreateJobDTO, outputCreateJobDTO } from './create.job.dto';
import { JobFactory } from 'src/core/domain/entities/jobs/factory/job.factory';
import { Job } from 'src/core/domain/entities/jobs/entity/job.entity';

export class CreateJobUseCase {
  constructor(private readonly jobRepository: JobInterfaceRepository) {}
  async execute(input: inputCreateJobDTO): Promise<outputCreateJobDTO> {
    const newJob: Job = JobFactory.create({
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
