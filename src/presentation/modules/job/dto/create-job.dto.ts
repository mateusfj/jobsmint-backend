import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import {
  inputCreateJobDTO,
  outputCreateJobDTO,
} from 'src/core/application/use-cases/job/create-job/create.job.dto';
import { EEmploymentType } from 'src/core/shared/utils/enums/EmploymentType';
import { EStatusJob } from 'src/core/shared/utils/enums/EStatusJob';
import { EWorkMode } from 'src/core/shared/utils/enums/EWorkMode';

export class CreateJobDto implements inputCreateJobDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  salary: number | null;

  @IsEnum(EWorkMode)
  @IsString()
  @IsNotEmpty()
  workMode: EWorkMode;

  @IsEnum(EEmploymentType)
  @IsString()
  @IsNotEmpty()
  employmentType: EEmploymentType;

  @IsEnum(EStatusJob)
  @IsString()
  @IsNotEmpty()
  status: EStatusJob;
}

export class CreateJobResponseDto implements outputCreateJobDTO {
  id: string;
  title: string;
  description: string;
  salary: number | null;
  workMode: EWorkMode;
  employmentType: EEmploymentType;
  status: EStatusJob;
}
