import { UserValidator } from '../validator/user.validator';

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}
