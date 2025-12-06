import { BaseEntity } from 'src/core/domain/@shared/base-entity/base-entity.abstract';
import { EEmploymentType } from 'src/core/domain/@shared/enums/EmploymentType';
import { EStatusJob } from 'src/core/domain/@shared/enums/EStatusJob';
import { EWorkMode } from 'src/core/domain/@shared/enums/EWorkMode';
import { NotificationError } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { JobValidatorFactory } from '../factory/job.validator.factory';

export interface JobProps {
  id?: string;
  company_id: string;
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
  company_id: string;
  title: string;
  description: string;
  salary: number | null;
  workMode: EWorkMode;
  employmentType: EEmploymentType;
  status: EStatusJob;
  isActive: boolean;

  constructor({
    id,
    company_id,
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
    this.company_id = company_id;
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
