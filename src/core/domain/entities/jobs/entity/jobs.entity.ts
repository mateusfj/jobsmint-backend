import { BaseEntity } from 'src/core/shared/base-entity/base-entity.abstract';
import { NotificationError } from 'src/core/shared/exceptions/domain.exceptions';
import { EEmploymentType } from 'src/core/shared/utils/enums/EmploymentType';
import { EStatusJobs } from 'src/core/shared/utils/enums/EStatusJobs';
import { EWorkMode } from 'src/core/shared/utils/enums/EWorkMode';
import { JobsValidatorFactory } from '../factory/jobs.validator.factory';

export interface JobsProps {
  id: string;
  title: string;
  description: string;
  salary: number | null;
  workMode: EWorkMode;
  employmentType: EEmploymentType;
  status: EStatusJobs;
}

export class Jobs extends BaseEntity {
  id: string;
  title: string;
  description: string;
  salary: number | null;
  workMode: EWorkMode;
  employmentType: EEmploymentType;
  status: EStatusJobs;

  constructor({
    id,
    title,
    description,
    salary,
    workMode,
    employmentType,
    status,
  }: JobsProps) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.salary = salary ?? null;
    this.workMode = workMode;
    this.employmentType = employmentType;
    this.status = status;
    this.validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(entity: Jobs) {
    const validator = JobsValidatorFactory.create();
    validator.validate(this.notification, entity);
  }
}
