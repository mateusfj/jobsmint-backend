import { RepositoryInterface } from 'src/core/shared/repository/repository.interface';
import { Job } from '../entity/job.entity';

export interface JobInterfaceRepository extends RepositoryInterface<Job> {
  findByTitle(title: string): Promise<Job | null>;
}

export const JOB_REPOSITORY_INTERFACE: unique symbol = Symbol(
  'JobInterfaceRepository',
);
