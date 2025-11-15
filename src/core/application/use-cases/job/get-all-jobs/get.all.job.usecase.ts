import { JobInterfaceRepository } from 'src/core/domain/entities/jobs/repository/job.repository.interface';
import { outputGetAllJobsDTO } from './get.all.job.dto';

export class GetAllJobsUseCase {
  constructor(private readonly jobRepository: JobInterfaceRepository) {}
  async execute(): Promise<outputGetAllJobsDTO[]> {
    const jobs = await this.jobRepository.findAll();
    return jobs;
  }
}
