import { v4 as uuid } from 'uuid';
import { User, UserProps } from '../entity/user.entity';

export class UserFactory {
  static create(entity: UserProps): User {
    const user = new User({
      id: uuid(),
      name: entity.name,
      email: entity.email,
      password: entity.password,
      role: entity.role,
    });
    user.validate(user);
    return user;
  }
}
