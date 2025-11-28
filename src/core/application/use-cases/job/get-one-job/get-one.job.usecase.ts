import { JobInterfaceRepository } from 'src/core/domain/jobs/repository/job.repository.interface';
import { inputGetOneJobDTO, outputGetOneJobDTO } from './get-one.job.dto';
import { NotFoundDomainException } from 'src/core/shared/exceptions/domain.exceptions';
import { QueryParamsGetOne } from 'src/core/shared/interfaces/query-params/query-params.interface';
import { ResponseItem } from 'src/core/shared/types/IResponse';

export class GetOneJobUseCase {
  constructor(private readonly jobRepository: JobInterfaceRepository) {}

  async execute(
    input: inputGetOneJobDTO,
    query: QueryParamsGetOne,
  ): Promise<ResponseItem<outputGetOneJobDTO>> {
    const job = await this.jobRepository.findOneModel(input.id, query);

    if (!job) {
      throw new NotFoundDomainException('Job not found');
    }

    return { data: job };
  }
}
