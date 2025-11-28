import { CompanyInterfaceRepository } from 'src/core/domain/company/repository/company.repository.interface';
import { inputGetOneCompanyDTO } from './get-one.company.dto';
import { NotFoundDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { QueryParamsGetOne } from 'src/infrastructure/repositories/typeorm/services/dto/base-find-one.dto';
import { ResponseItem } from 'src/core/domain/@shared/types/IResponse';

export class GetOneCompanyUseCase {
  constructor(private readonly companyRepository: CompanyInterfaceRepository) {}

  async execute(
    input: inputGetOneCompanyDTO,
    query: QueryParamsGetOne,
  ): Promise<ResponseItem<any>> {
    const company = await this.companyRepository.findOneModel(input.id, query);

    if (!company) {
      throw new NotFoundDomainException('Company not found');
    }

    return { data: company };
  }
}
