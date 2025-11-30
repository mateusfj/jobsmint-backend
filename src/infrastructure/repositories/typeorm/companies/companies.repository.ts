import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyModel } from './companies.model';
import { CompanyInterfaceRepository } from 'src/core/domain/company/repository/company.repository.interface';
import { Company } from 'src/core/domain/company/entity/company.entity';
import { ResponseList } from 'src/core/domain/@shared/types/IResponse';
import { CompanyFactory } from 'src/core/domain/company/factory/company.factory';
import { BaseFindAllService } from 'src/infrastructure/repositories/typeorm/services/base-find-all.service';
import { BaseFindOneService } from 'src/infrastructure/repositories/typeorm/services/base-find-one.service';

import { QueryParams } from 'src/core/application/@shared/interfaces/query-params/query-params.interface';
import { QueryParamsGetOne } from '../services/dto/base-find-one.dto';

@Injectable()
export class CompanyRepository implements CompanyInterfaceRepository {
  constructor(
    @InjectRepository(CompanyModel)
    private readonly companiesRepository: Repository<CompanyModel>,
    private readonly baseFindAllService: BaseFindAllService<CompanyModel>,
    private readonly baseFindOneService: BaseFindOneService<CompanyModel>,
  ) {}

  async findOneModel(
    id: string,
    query: QueryParamsGetOne,
  ): Promise<CompanyModel | null> {
    const company = await this.baseFindOneService.findOneById(
      this.companiesRepository,
      'company',
      id,
      query,
    );
    return company;
  }

  async findAllModels(query: QueryParams): Promise<ResponseList<CompanyModel>> {
    const companies = await this.baseFindAllService.findAllBase(
      this.companiesRepository,
      'company',
      query,
    );
    return companies;
  }

  async create(company: Company): Promise<void> {
    await this.companiesRepository.save({
      id: company.id,
      owner_id: company.owner_id,
      corporate_reason: company.corporate_reason,
      cnpj: company.cnpj,
      fantasy_name: company.fantasy_name,
      industry: company.industry,
      website: company.website,
      logo_url: company.logo_url,
      phone: company.phone,
      city: company.address?.city ?? null,
      description: company.description ?? null,
      complement: company.address?.complement ?? null,
      neighborhood: company.address?.neighborhood ?? null,
      number: company.address?.number ?? null,
      state: company.address?.state ?? null,
      street: company.address?.street ?? null,
      zip_code: company.address?.zip_code ?? null,
    });
  }

  async findAll(): Promise<Company[] | null> {
    const companies = await this.companiesRepository.find();
    return companies.map((company) =>
      CompanyFactory.create({
        id: company.id,
        owner_id: company.owner_id,
        corporate_reason: company.corporate_reason,
        fantasy_name: company.fantasy_name,
        industry: company.industry,
        phone: company.phone,
        cnpj: company.cnpj,
        description: company.description,
        website: company.website,
        logo_url: company.logo_url,
      }),
    );
  }

  async findOne(id: string): Promise<Company | null> {
    const company = await this.companiesRepository.findOne({ where: { id } });

    if (!company) {
      return null;
    }

    return CompanyFactory.create({
      id: company.id,
      owner_id: company.owner_id,
      corporate_reason: company.corporate_reason,
      fantasy_name: company.fantasy_name,
      industry: company.industry,
      cnpj: company.cnpj,
      phone: company.phone,
      description: company.description,
      website: company.website,
      logo_url: company.logo_url,
    });
  }

  async delete(id: string): Promise<void> {
    await this.companiesRepository.softDelete({ id });
  }

  async update(company: Company): Promise<void> {
    await this.companiesRepository.update(company.id, {
      corporate_reason: company.corporate_reason,
      cnpj: company.cnpj,
      description: company.description,
      website: company.website,
      logo_url: company.logo_url,
    });
  }
}
