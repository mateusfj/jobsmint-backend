import { v4 as uuid } from 'uuid';
import { Jobs, JobsProps } from '../entity/jobs.entity';

export class JobsFactory {
  static create(entity: JobsProps): Jobs {
    const jobs = new Jobs({
      id: uuid(),
      title: entity.title,
      description: entity.description,
      salary: entity.salary ?? null,
      workMode: entity.workMode,
      employmentType: entity.employmentType,
      status: entity.status,
    });
    jobs.validate(jobs);
    return jobs;
  }
}
