import { RepositoryInterface } from 'src/core/domain/@shared/repository/repository.interface';
import { Company } from '../entity/company.entity';
import { ResponseList } from 'src/core/domain/@shared/types/IResponse';
import { QueryParams } from 'src/core/application/@shared/interfaces/query-params/query-params.interface';
import { QueryParamsGetOne } from 'src/infrastructure/repositories/typeorm/services/dto/base-find-one.dto';

export interface CompanyInterfaceRepository
  extends RepositoryInterface<Company> {
  findOneModel(
    id: string,
    query: QueryParamsGetOne,
  ): Promise<Partial<Company> | null>;

  findAllModels(query: QueryParams): Promise<ResponseList<Partial<Company>>>;
}

export const COMPANY_REPOSITORY_INTERFACE: unique symbol = Symbol(
  'CompanyInterfaceRepository',
);
