import { ERole } from 'src/core/domain/@shared/enums/ERole';

export interface inputCreateUserWithCompanyDTO {
  name: string;
  email: string;
  password: string;
  corporate_reason: string;
  cnpj: string;
  description: string;
  website?: string | null;
  logo_url?: string | null;
}

export interface outputCreateUserWithCompanyDTO {
  company: {
    id: string;
    user_id: string;
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
