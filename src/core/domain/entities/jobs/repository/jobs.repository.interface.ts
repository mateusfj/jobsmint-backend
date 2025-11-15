import { RepositoryInterface } from 'src/core/shared/repository/repository.interface';
import { Jobs } from '../entity/jobs.entity';

export interface JobsInterfaceRepository extends RepositoryInterface<Jobs> {
  findByTitle(title: string): Promise<Jobs | null>;
}

export const JOBS_REPOSITORY_INTERFACE: unique symbol = Symbol(
  'JobsInterfaceRepository',
);
