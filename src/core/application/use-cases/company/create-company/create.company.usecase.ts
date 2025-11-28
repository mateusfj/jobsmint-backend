import { CompanyInterfaceRepository } from 'src/core/domain/company/repository/company.repository.interface';
import {
  inputCreateCompanyDTO,
  outputCreateCompanyDTO,
} from './create.company.dto';
import { CompanyFactory } from 'src/core/domain/company/factory/company.factory';
import { Company } from 'src/core/domain/company/entity/company.entity';

export class CreateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyInterfaceRepository) {}
  async execute(input: inputCreateCompanyDTO): Promise<outputCreateCompanyDTO> {
    const newCompany: Company = CompanyFactory.create({
      user_id: input.user_id,
      corporate_reason: input.corporate_reason,
      cnpj: input.cnpj,
      description: input.description,
      website: input.website ?? null,
      logo_url: input.logo_url ?? null,
    });

    await this.companyRepository.create(newCompany);

    return {
      id: newCompany.id,
      user_id: newCompany.user_id,
      corporate_reason: newCompany.corporate_reason,
      cnpj: newCompany.cnpj,
      description: newCompany.description,
      website: newCompany.website,
      logo_url: newCompany.logo_url,
    };
  }
}
