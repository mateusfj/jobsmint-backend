import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import {
  CreateCompanyDto,
  CreateCompanyResponseDto,
} from './dto/create.company.dto';
import { inputCreateCompanyDTO } from 'src/core/application/use-cases/company/create-company/create.company.dto';
import { CreateCompanyUseCase } from 'src/core/application/use-cases/company/create-company/create.company.usecase';
import { GetAllCompaniesUseCase } from 'src/core/application/use-cases/company/get-all-companies/get-all.company.usecase';
import { GetOneCompanyUseCase } from 'src/core/application/use-cases/company/get-one-company/get-one.company.usecase';
import { DeleteCompanyUseCase } from 'src/core/application/use-cases/company/delete-company/delete.company.usecase';
import { inputDeleteCompanyDTO } from 'src/core/application/use-cases/company/delete-company/delete.company.dto';
import { inputGetOneCompanyDTO } from 'src/core/application/use-cases/company/get-one-company/get-one.company.dto';
import { DeleteCompanyResponseDto } from './dto/delete.company.dto';
import { QueryParamsDto } from 'src/infrastructure/repositories/typeorm/services/dto/base-find-all.dto';
import { QueryParamsGetOne } from 'src/infrastructure/repositories/typeorm/services/dto/base-find-one.dto';
import { ResponseItem, ResponseList } from 'src/core/shared/types/IResponse';
import { UpdateCompanyDto } from './dto/update.company.dto';
import { inputUpdateCompanyDTO } from 'src/core/application/use-cases/company/update-company/update.company.dto';
import { UpdateCompanyUseCase } from 'src/core/application/use-cases/company/update-company/update.company.usecase';
import { SwaggerDocs } from 'src/utils/decorators/swagger.decorator';
import { COMPANY_SCHEMA } from 'src/utils/swagger/schema/company.schema';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly getAllCompaniesUseCase: GetAllCompaniesUseCase,
    private readonly getOneCompanyUseCase: GetOneCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
  ) {}

  @Post()
  @SwaggerDocs(COMPANY_SCHEMA.create)
  create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<CreateCompanyResponseDto> {
    const input: inputCreateCompanyDTO = {
      user_id: createCompanyDto.user_id,
      corporate_reason: createCompanyDto.corporate_reason,
      cnpj: createCompanyDto.cnpj,
      description: createCompanyDto.description,
      website: createCompanyDto.website,
      logo_url: createCompanyDto.logo_url,
    };
    return this.createCompanyUseCase.execute(input);
  }

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

  @Patch(':id')
  @SwaggerDocs(COMPANY_SCHEMA.update)
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    const input: inputUpdateCompanyDTO = {
      id,
      user_id: updateCompanyDto.user_id,
      corporate_reason: updateCompanyDto.corporate_reason,
      cnpj: updateCompanyDto.cnpj,
      description: updateCompanyDto.description,
      website: updateCompanyDto.website,
      logo_url: updateCompanyDto.logo_url,
    };
    return this.updateCompanyUseCase.execute(input);
  }

  @Delete(':id')
  @SwaggerDocs(COMPANY_SCHEMA.delete)
  remove(@Param('id') id: string): Promise<DeleteCompanyResponseDto> {
    const input: inputDeleteCompanyDTO = { id };
    return this.deleteCompanyUseCase.execute(input);
  }
}
