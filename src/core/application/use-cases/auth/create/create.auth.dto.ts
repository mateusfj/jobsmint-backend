import { ERole } from 'src/shared/enums/ERole';

export interface inputCreateAuthDTO {
  name: string;
  email: string;
  password: string;
  role: ERole;
}

export interface outputCreateAuthDTO {
  id: string;
  name: string;
  email: string;
  role: ERole;
  isActive: boolean;
}
