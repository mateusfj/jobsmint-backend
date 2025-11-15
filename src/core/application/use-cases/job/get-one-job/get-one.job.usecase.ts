import { JobInterfaceRepository } from 'src/core/domain/entities/jobs/repository/job.repository.interface';
import { inputGetOneJobDTO, outputGetOneJobDTO } from './get-one.job.dto';
import { NotFoundDomainException } from 'src/core/shared/exceptions/domain.exceptions';

export class GetOneJobUseCase {
  constructor(private readonly jobRepository: JobInterfaceRepository) {}
  async execute(input: inputGetOneJobDTO): Promise<outputGetOneJobDTO | null> {
    const job = await this.jobRepository.findOne(input.id);

    if (!job) {
      throw new NotFoundDomainException('Job not found');
    }

    return {
      id: job.id,
      title: job.title,
      description: job.description,
      salary: job.salary,
      workMode: job.workMode,
      employmentType: job.employmentType,
      status: job.status,
    };
  }
}
