import { JobInterfaceRepository } from 'src/core/domain/entities/jobs/repository/job.repository.interface';
import { inputCreateJobDTO, outputCreateJobDTO } from './create.job.dto';
import { ConflictDomainException } from 'src/core/shared/exceptions/domain.exceptions';
import { JobFactory } from 'src/core/domain/entities/jobs/factory/job.factory';
import { Job } from 'src/core/domain/entities/jobs/entity/job.entity';

export class CreateJobUseCase {
  constructor(private readonly jobRepository: JobInterfaceRepository) {}
  async execute(data: inputCreateJobDTO): Promise<outputCreateJobDTO> {
    const job = await this.jobRepository.findOne(data.title);

    if (job) {
      throw new ConflictDomainException('Job already exists');
    }

    const newJob: Job = JobFactory.create({
      title: data.title,
      description: data.description,
      salary: data.salary ?? null,
      workMode: data.workMode,
      employmentType: data.employmentType,
      status: data.status,
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
