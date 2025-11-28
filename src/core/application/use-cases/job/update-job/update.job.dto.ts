import { EEmploymentType } from 'src/core/domain/@shared/enums/EmploymentType';
import { EStatusJob } from 'src/core/domain/@shared/enums/EStatusJob';
import { EWorkMode } from 'src/core/domain/@shared/enums/EWorkMode';

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
