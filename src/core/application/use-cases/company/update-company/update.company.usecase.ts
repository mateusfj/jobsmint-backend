import { Company } from 'src/core/domain/entities/company/entity/company.entity';
import { inputUpdateCompanyDTO } from './update.company.dto';
import { CompanyFactory } from 'src/core/domain/entities/company/factory/company.factory';
import { NotFoundDomainException } from 'src/core/shared/exceptions/domain.exceptions';
import { CompanyInterfaceRepository } from 'src/core/domain/entities/company/repository/company.repository.interface';

export class UpdateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyInterfaceRepository) {}

  async execute(input: inputUpdateCompanyDTO): Promise<Company> {
    const company = await this.companyRepository.findOne(input.id);

    if (!company) {
      throw new NotFoundDomainException('Company not found');
    }

    const updatedCompany: Company = CompanyFactory.create({
      id: input.id,
      user_id: input.user_id ?? company.user_id,
      corporate_reason: input.corporate_reason ?? company.corporate_reason,
      cnpj: input.cnpj ?? company.cnpj,
      description: input.description ?? company.description,
      website: input.website ?? company.website,
      logo_url: input.logo_url ?? company.logo_url,
    });

    await this.companyRepository.update(updatedCompany);

    return updatedCompany;
  }
}
