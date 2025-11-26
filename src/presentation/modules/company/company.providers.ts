import { CompanyRepository } from 'src/infrastructure/repositories/typeorm/companies/companies.repository';
import { COMPANY_REPOSITORY_INTERFACE } from 'src/core/domain/entities/company/repository/company.repository.interface';
import { CreateCompanyUseCase } from 'src/core/application/use-cases/company/create-company/create.company.usecase';
import { GetAllCompaniesUseCase } from 'src/core/application/use-cases/company/get-all-companies/get-all.company.usecase';
import { UpdateCompanyUseCase } from 'src/core/application/use-cases/company/update-company/update.company.usecase';
import { DeleteCompanyUseCase } from 'src/core/application/use-cases/company/delete-company/delete.company.usecase';
import { GetOneCompanyUseCase } from 'src/core/application/use-cases/company/get-one-company/get-one.company.usecase';
import { BaseFindAllService } from 'src/infrastructure/repositories/typeorm/services/base-find-all.service';
import { BaseFindOneService } from 'src/infrastructure/repositories/typeorm/services/base-find-one.service';

export const COMPANY_PROVIDERS = [
  BaseFindAllService,
  BaseFindOneService,
  CompanyRepository,
  {
    provide: COMPANY_REPOSITORY_INTERFACE,
    useClass: CompanyRepository,
  },
  {
    provide: CreateCompanyUseCase,
    useFactory: (companyRepository: CompanyRepository) => {
      return new CreateCompanyUseCase(companyRepository);
    },
    inject: [COMPANY_REPOSITORY_INTERFACE],
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
    provide: UpdateCompanyUseCase,
    useFactory: (companyRepository: CompanyRepository) => {
      return new UpdateCompanyUseCase(companyRepository);
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
