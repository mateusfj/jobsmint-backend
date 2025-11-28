import { ERole } from 'src/core/domain/@shared/enums/ERole';

export interface inputCreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: ERole;
}

export interface outputCreateUserDTO {
  id: string;
  name: string;
  email: string;
  role: ERole;
  isActive: boolean;
}
