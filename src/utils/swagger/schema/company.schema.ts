import {
  CreateCompanyDto,
  CreateCompanyResponseDto,
} from 'src/presentation/modules/company/dto/create.company.dto';
import { DeleteCompanyResponseDto } from 'src/presentation/modules/company/dto/delete.company.dto';
import { GetAllCompaniesOutputDto } from 'src/presentation/modules/company/dto/get-all.company.dto';
import { GetOneCompanyOutputDto } from 'src/presentation/modules/company/dto/get-one.company.dto';
import { UpdateCompanyDto } from 'src/presentation/modules/company/dto/update.company.dto';

export const COMPANY_SCHEMA = {
  create: {
    method: 'post' as const,
    summary: 'Create one company',
    description: 'This function creates one company',
    bodyType: CreateCompanyDto,
    response: [
      {
        status: 201,
        description: 'company created successfully',
        type: CreateCompanyResponseDto,
      },
    ],
  },

  getAll: {
    method: 'get' as const,
    summary: 'Get all companies',
    description: 'This function retrieves all companies',
    queryParams: [
      { name: 'select', type: String },
      { name: 'sortBy', type: String },
      { name: 'orderBy', enum: ['asc', 'desc'] },
      { name: 'page', type: Number },
      { name: 'limit', type: Number },
    ],
    response: [
      {
        status: 200,
        description: 'List of all companies',
        type: GetAllCompaniesOutputDto,
      },
    ],
  },

  getOne: {
    method: 'get' as const,
    summary: 'Get one company',
    description: 'This function retrieves one company',
    queryParams: [{ name: 'select', type: String }],
    response: [
      {
        status: 200,
        description: 'One company',
        type: GetOneCompanyOutputDto,
      },
    ],
  },

  delete: {
    method: 'delete' as const,
    summary: 'Delete one company',
    description: 'This function deletes one company',
    response: [
      {
        status: 200,
        description: 'Company deleted successfully',
        type: DeleteCompanyResponseDto,
      },
    ],
  },

  update: {
    method: 'patch' as const,
    summary: 'Update one company',
    description: 'This function updates one company',
    response: [
      {
        status: 200,
        description: 'Company updated successfully',
        type: UpdateCompanyDto,
      },
    ],
  },
};
