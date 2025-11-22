import { JobInterfaceRepository } from 'src/core/domain/entities/jobs/repository/job.repository.interface';
import { ResponseList } from 'src/core/shared/types/IResponse';

import { outputGetAllJobsDTO } from './get.all.job.dto';
import { QueryParams } from 'src/core/shared/interfaces/query-params/query-params.interface';

export class GetAllJobsUseCase {
  constructor(private readonly jobRepository: JobInterfaceRepository) {}

  async execute(
    query: QueryParams,
  ): Promise<ResponseList<outputGetAllJobsDTO>> {
    const jobs = await this.jobRepository.findAllModels(query);
    return jobs;
  }
}
