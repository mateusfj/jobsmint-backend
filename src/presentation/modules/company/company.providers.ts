import { DeleteCompanyUseCase } from 'src/core/application/use-cases/company/delete-company/delete.company.usecase';
import { GetAllCompaniesUseCase } from 'src/core/application/use-cases/company/get-all-companies/get-all.company.usecase';
import { GetOneCompanyUseCase } from 'src/core/application/use-cases/company/get-one-company/get-one.company.usecase';
import { COMPANY_REPOSITORY_INTERFACE } from 'src/core/domain/company/repository/company.repository.interface';
import { CompanyRepository } from 'src/infrastructure/repositories/typeorm/companies/companies.repository';
import { TYPEORM_SERVICES_PROVIDERS } from 'src/infrastructure/repositories/typeorm/services/typeorm-services.providers';

export const COMPANY_PROVIDERS = [
  ...TYPEORM_SERVICES_PROVIDERS,
  CompanyRepository,
  {
    provide: COMPANY_REPOSITORY_INTERFACE,
    useClass: CompanyRepository,
  },
  {
    provide: GetAllCompaniesUseCase,
    useFactory: (companyRepository: CompanyRepository) => {
      return new GetAllCompaniesUseCase(companyRepository);
    },
    inject: [COMPANY_REPOSITORY_INTERFACE],
  },
  {
    provide: GetOneCompanyUseCase,
    useFactory: (companyRepository: CompanyRepository) => {
      return new GetOneCompanyUseCase(companyRepository);
    },
    inject: [COMPANY_REPOSITORY_INTERFACE],
  },
  {
    provide: DeleteCompanyUseCase,
    useFactory: (companyRepository: CompanyRepository) => {
      return new DeleteCompanyUseCase(companyRepository);
    },
    inject: [COMPANY_REPOSITORY_INTERFACE],
  },
];
