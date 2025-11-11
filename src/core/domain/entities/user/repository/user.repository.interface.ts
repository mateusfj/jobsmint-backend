import { RepositoryInterface } from 'src/core/shared/repository/repository.interface';
import { User } from '../entity/user.entity';

export interface UserInterfaceRepository extends RepositoryInterface<User> {
  findByEmail(email: string): Promise<User | null>;
}

export const USER_REPOSITORY_INTERFACE: unique symbol = Symbol(
  'UserInterfaceRepository',
);
