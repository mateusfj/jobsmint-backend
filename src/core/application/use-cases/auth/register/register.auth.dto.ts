import { ERole } from 'src/core/domain/@shared/enums/ERole';

export interface inputRegisterUserAuthDTO {
  name: string;
  email: string;
  password: string;
  role: ERole;
}

export interface outputRegisterUserAuthDTO {
  id: string;
  name: string;
  email: string;
  role: ERole;
  isActive: boolean;
}
