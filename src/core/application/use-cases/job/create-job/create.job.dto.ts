import { EEmploymentType } from 'src/core/domain/@shared/enums/EmploymentType';
import { EStatusJob } from 'src/core/domain/@shared/enums/EStatusJob';
import { EWorkMode } from 'src/core/domain/@shared/enums/EWorkMode';

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
