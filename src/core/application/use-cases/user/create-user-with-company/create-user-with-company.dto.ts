import { ERole } from 'src/core/domain/@shared/enums/ERole';
import { inputCreateCompanyDTO } from '../../company/create-company/create.company.dto';
import { inputCreateUserDTO } from '../create-user/create.user.dto';

export interface inputCreateUserWithCompanyDTO {
  user: inputCreateUserDTO;
  company: inputCreateCompanyDTO;
}

export interface outputCreateUserWithCompanyDTO {
  company: {
    id: string;
    owner_id: string;
    corporate_reason: string;
    cnpj: string;
    description: string;
    website?: string | null;
    logo_url?: string | null;
  };
  user: {
    id: string;
    name: string;
    email: string;
    role: ERole;
    isActive: boolean;
  };
}
