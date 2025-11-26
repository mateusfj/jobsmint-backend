import { Module } from '@nestjs/common';

import { CompanyModel } from 'src/infrastructure/repositories/typeorm/companies/companies.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { COMPANY_PROVIDERS } from './company.providers';
import { CompanyController } from './company.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyModel])],
  controllers: [CompanyController],
  providers: [...COMPANY_PROVIDERS],
})
export class CompanyModule {}
