import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EEmploymentType } from 'src/core/shared/utils/enums/EmploymentType';
import { EStatusJobs } from 'src/core/shared/utils/enums/EStatusJobs';
import { EWorkMode } from 'src/core/shared/utils/enums/EWorkMode';
import { JobsProps } from '../entity/jobs.entity';
import { ClassValidatorFields } from 'src/core/shared/validator/class-validator-fields';
import { Notification } from 'src/core/shared/notification/notification';

export class JobsRules {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  salary: number | null;

  @IsEnum(EWorkMode)
  @IsNotEmpty()
  workMode: EWorkMode;

  @IsEnum(EEmploymentType)
  @IsNotEmpty()
  employmentType: EEmploymentType;

  @IsEnum(EStatusJobs)
  @IsNotEmpty()
  status: EStatusJobs;

  constructor(props: JobsProps) {
    this.title = props.title;
    this.description = props.description;
    this.salary = props.salary;
    this.workMode = props.workMode;
    this.employmentType = props.employmentType;
    this.status = props.status;
  }
}

export class JobsValidator extends ClassValidatorFields {
  validate(notification: Notification, entity: JobsProps): boolean {
    return super.validate(notification, new JobsRules(entity));
  }
}
