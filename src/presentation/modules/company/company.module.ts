import { Module } from '@nestjs/common';

import { CompanyModel } from 'src/infrastructure/repositories/typeorm/companies/companies.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { COMPANY_PROVIDERS } from './company.providers';
import { CompanyController } from './company.controller';
import { CreateCompanyUseCase } from 'src/core/application/use-cases/company/create-company/create.company.usecase';
import { COMPANY_REPOSITORY_INTERFACE } from 'src/core/domain/company/repository/company.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyModel])],
  controllers: [CompanyController],
  providers: [...COMPANY_PROVIDERS],
  exports: [CreateCompanyUseCase, COMPANY_REPOSITORY_INTERFACE],
})
export class CompanyModule {}
