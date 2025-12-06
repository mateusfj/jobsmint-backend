import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { EEmploymentType } from 'src/core/domain/@shared/enums/EmploymentType';
import { EStatusJob } from 'src/core/domain/@shared/enums/EStatusJob';
import { EWorkMode } from 'src/core/domain/@shared/enums/EWorkMode';
import { Notification } from 'src/core/domain/@shared/notification/notification';
import { ClassValidatorFields } from 'src/core/domain/@shared/validator/class-validator-fields';
import { JobProps } from '../entity/job.entity';

export class JobRules {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  company_id: string;

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

  @IsEnum(EStatusJob)
  @IsNotEmpty()
  status: EStatusJob;

  constructor(props: JobProps) {
    this.title = props.title;
    this.description = props.description;
    this.salary = props.salary;
    this.workMode = props.workMode;
    this.employmentType = props.employmentType;
    this.status = props.status;
  }
}

export class JobValidator extends ClassValidatorFields {
  validate(notification: Notification, entity: JobProps): boolean {
    return super.validate(notification, new JobRules(entity));
  }
}
