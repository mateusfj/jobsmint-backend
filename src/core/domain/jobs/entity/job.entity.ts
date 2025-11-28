import { BaseEntity } from 'src/core/shared/base-entity/base-entity.abstract';
import { NotificationError } from 'src/core/shared/exceptions/domain.exceptions';
import { EEmploymentType } from 'src/core/shared/utils/enums/EmploymentType';
import { EStatusJob } from 'src/core/shared/utils/enums/EStatusJob';
import { EWorkMode } from 'src/core/shared/utils/enums/EWorkMode';
import { JobValidatorFactory } from '../factory/job.validator.factory';

export interface JobProps {
  id?: string;
  title: string;
  description: string;
  salary: number | null;
  workMode: EWorkMode;
  employmentType: EEmploymentType;
  status: EStatusJob;
  isActive: boolean;
}

export class Job extends BaseEntity {
  id: string;
  title: string;
  description: string;
  salary: number | null;
  workMode: EWorkMode;
  employmentType: EEmploymentType;
  status: EStatusJob;
  isActive: boolean;

  constructor({
    id,
    title,
    description,
    salary,
    workMode,
    employmentType,
    status,
    isActive,
  }: JobProps) {
    super();
    this.id = id ?? '';
    this.title = title;
    this.description = description;
    this.salary = salary ?? null;
    this.workMode = workMode;
    this.employmentType = employmentType;
    this.status = status;
    this.isActive = isActive;
    this.validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(entity: Job) {
    const validator = JobValidatorFactory.create();
    validator.validate(this.notification, entity);
  }
}
