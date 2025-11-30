import { DeleteCompanyResponseDto } from 'src/presentation/modules/company/dto/delete.company.dto';
import { GetAllCompaniesOutputDto } from 'src/presentation/modules/company/dto/get-all.company.dto';
import { GetOneCompanyOutputDto } from 'src/presentation/modules/company/dto/get-one.company.dto';

export const COMPANY_SCHEMA = {
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
};
