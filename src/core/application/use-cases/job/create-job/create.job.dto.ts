import { EEmploymentType } from 'src/core/shared/utils/enums/EmploymentType';
import { EStatusJob } from 'src/core/shared/utils/enums/EStatusJob';
import { EWorkMode } from 'src/core/shared/utils/enums/EWorkMode';

export interface inputCreateJobDTO {
  title: string;
  description: string;
  salary?: number | null;
  workMode: EWorkMode;
  employmentType: EEmploymentType;
  status: EStatusJob;
}

export interface outputCreateJobDTO {
  id: string;
  title: string;
  description: string;
  salary: number | null;
  workMode: EWorkMode;
  employmentType: EEmploymentType;
  status: EStatusJob;
}
