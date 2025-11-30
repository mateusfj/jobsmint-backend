import { Controller, Body, Get, Delete, Param, Query } from '@nestjs/common';
import { GetAllCompaniesUseCase } from 'src/core/application/use-cases/company/get-all-companies/get-all.company.usecase';
import { GetOneCompanyUseCase } from 'src/core/application/use-cases/company/get-one-company/get-one.company.usecase';
import { DeleteCompanyUseCase } from 'src/core/application/use-cases/company/delete-company/delete.company.usecase';
import { inputDeleteCompanyDTO } from 'src/core/application/use-cases/company/delete-company/delete.company.dto';
import { inputGetOneCompanyDTO } from 'src/core/application/use-cases/company/get-one-company/get-one.company.dto';
import { DeleteCompanyResponseDto } from './dto/delete.company.dto';
import { QueryParamsDto } from 'src/infrastructure/repositories/typeorm/services/dto/base-find-all.dto';
import { QueryParamsGetOne } from 'src/infrastructure/repositories/typeorm/services/dto/base-find-one.dto';
import {
  ResponseItem,
  ResponseList,
} from 'src/core/domain/@shared/types/IResponse';

import { SwaggerDocs } from 'src/utils/decorators/swagger.decorator';
import { COMPANY_SCHEMA } from 'src/utils/swagger/schema/company.schema';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly getAllCompaniesUseCase: GetAllCompaniesUseCase,
    private readonly getOneCompanyUseCase: GetOneCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
  ) {}

  @Get()
  @SwaggerDocs(COMPANY_SCHEMA.getAll)
  getAll(@Query() query: QueryParamsDto): Promise<ResponseList<any>> {
    return this.getAllCompaniesUseCase.execute(query);
  }

  @Get(':id')
  @SwaggerDocs(COMPANY_SCHEMA.getOne)
  findOne(
    @Param('id') id: string,
    @Query() query: QueryParamsGetOne,
  ): Promise<ResponseItem<any> | null> {
    const input: inputGetOneCompanyDTO = { id };
    return this.getOneCompanyUseCase.execute(input, query);
  }

  @Delete(':id')
  @SwaggerDocs(COMPANY_SCHEMA.delete)
  remove(@Param('id') id: string): Promise<DeleteCompanyResponseDto> {
    const input: inputDeleteCompanyDTO = { id };
    return this.deleteCompanyUseCase.execute(input);
  }
}
