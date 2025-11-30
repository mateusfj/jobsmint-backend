import { IAddress } from 'src/core/domain/value-objects/address/entity/address.entity';

export interface inputCreateCompanyDTO {
  owner_id: string;
  corporate_reason: string;
  cnpj: string;
  fantasy_name: string;
  industry: string;
  phone: string;
  address: IAddress;
}

export interface outputCreateCompanyDTO {
  id: string;
  user_id: string;
  corporate_reason: string;
  cnpj: string;
  description: string;
  website?: string | null;
  logo_url?: string | null;
}
