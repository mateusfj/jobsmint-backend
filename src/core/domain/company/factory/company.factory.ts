import { v4 as uuid } from 'uuid';
import { Company, CompanyProps } from '../entity/company.entity';

export class CompanyFactory {
  static create(entity: CompanyProps): Company {
    const company = new Company({
      id: entity.id ?? uuid(),
      user_id: entity.user_id,
      corporate_reason: entity.corporate_reason,
      cnpj: entity.cnpj,
      description: entity.description,
      website: entity.website ?? null,
      logo_url: entity.logo_url ?? null,
    });
    company.validate(company);
    return company;
  }
}
