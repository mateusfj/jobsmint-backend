import { v4 as uuid } from 'uuid';
import { Job, JobProps } from '../entity/job.entity';

export class JobFactory {
  static create(entity: JobProps): Job {
    const job = new Job({
      id: uuid(),
      title: entity.title,
      description: entity.description,
      salary: entity.salary ?? null,
      workMode: entity.workMode,
      employmentType: entity.employmentType,
      status: entity.status,
      isActive: entity.isActive ?? true,
    });
    job.validate(job);
    return job;
  }
}
