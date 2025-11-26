export interface inputUpdateCompanyDTO {
  id: string;
  user_id?: string;
  corporate_reason?: string;
  cnpj?: string;
  description?: string;
  website?: string | null;
  logo_url?: string | null;
}

export type outputUpdateCompanyDTO = any;
