import { CompanyInterfaceRepository } from 'src/core/domain/company/repository/company.repository.interface';
import { ResponseList } from 'src/core/domain/@shared/types/IResponse';
import { outputGetAllCompaniesDTO } from './get-all.company.dto';
import { QueryParams } from 'src/core/application/@shared/interfaces/query-params/query-params.interface';

export class GetAllCompaniesUseCase {
  constructor(private readonly companyRepository: CompanyInterfaceRepository) {}

  async execute(
    query: QueryParams,
  ): Promise<ResponseList<outputGetAllCompaniesDTO>> {
    const companies = await this.companyRepository.findAllModels(query);
    return companies;
  }
}
