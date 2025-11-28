import { JobInterfaceRepository } from 'src/core/domain/jobs/repository/job.repository.interface';
import { ResponseList } from 'src/core/domain/@shared/types/IResponse';

import { outputGetAllJobsDTO } from './get.all.job.dto';
import { QueryParams } from 'src/core/application/@shared/interfaces/query-params/query-params.interface';

export class GetAllJobsUseCase {
  constructor(private readonly jobRepository: JobInterfaceRepository) {}

  async execute(
    query: QueryParams,
  ): Promise<ResponseList<outputGetAllJobsDTO>> {
    const jobs = await this.jobRepository.findAllModels(query);
    return jobs;
  }
}
