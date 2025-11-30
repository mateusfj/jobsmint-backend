import { v4 as uuid } from 'uuid';
import { Company, CompanyProps } from '../entity/company.entity';

export class CompanyFactory {
  static create(entity: CompanyProps): Company {
    const company: Company = new Company({
      id: entity.id ?? uuid(),
      owner_id: entity.owner_id,
      corporate_reason: entity.corporate_reason,
      cnpj: entity.cnpj,
      fantasy_name: entity.fantasy_name,
      industry: entity.industry,
      phone: entity.phone,
      description: entity.description ?? null,
      address: entity.address ?? null,
      website: entity.website ?? null,
      logo_url: entity.logo_url ?? null,
    });
    company.validate(company);
    return company;
  }
}
