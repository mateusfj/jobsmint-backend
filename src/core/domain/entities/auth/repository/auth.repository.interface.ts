import { RepositoryInterface } from 'src/core/shared/repository/repository.interface';
import { Auth } from '../entity/auth.entity';

export interface AuthInterfaceRepository extends RepositoryInterface<Auth> {
  findByEmail(email: string): Promise<Auth | null>;
}

export const AUTH_REPOSITORY_INTERFACE: unique symbol = Symbol(
  'AuthInterfaceRepository',
);
