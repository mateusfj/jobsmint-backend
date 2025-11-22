import { QueryParams } from '../query-params/query-params.interface';

export interface RepositoryInterface<T> {
  create(data: T): Promise<void>;
  findOne(id: string): Promise<T | null>;
  findAll(params?: QueryParams): Promise<T[] | null>;
  update(data: T): Promise<T>;
  delete(id: string): Promise<void>;
}
