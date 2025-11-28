import { RepositoryInterface } from 'src/core/domain/@shared/repository/repository.interface';
import { Job } from '../entity/job.entity';

import { ResponseList } from 'src/core/domain/@shared/types/IResponse';
import { QueryParams } from 'src/core/application/@shared/interfaces/query-params/query-params.interface';
import { QueryParamsGetOne } from 'src/infrastructure/repositories/typeorm/services/dto/base-find-one.dto';

export interface JobInterfaceRepository extends RepositoryInterface<Job> {
  findOneModel(
    id: string,
    query: QueryParamsGetOne,
  ): Promise<Partial<Job> | null>;

  findAllModels(query: QueryParams): Promise<ResponseList<Partial<Job>>>;
}

export const JOB_REPOSITORY_INTERFACE: unique symbol = Symbol(
  'JobInterfaceRepository',
);
