import { EEmploymentType } from 'src/core/shared/utils/enums/EmploymentType';
import { EStatusJob } from 'src/core/shared/utils/enums/EStatusJob';
import { EWorkMode } from 'src/core/shared/utils/enums/EWorkMode';

export interface inputUpdateJobDTO {
  id: string;
  title?: string;
  description?: string;
  salary?: number | null;
  workMode?: EWorkMode;
  employmentType?: EEmploymentType;
  status?: EStatusJob;
  isActive?: boolean;
}

export interface outputUpdateJobDTO {
  id: string;
  title: string;
  description: string;
  salary: number | null;
  workMode: EWorkMode;
  employmentType: EEmploymentType;
  status: EStatusJob;
  isActive: boolean;
}
