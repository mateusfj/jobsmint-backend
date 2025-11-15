import { UserValidator } from '../validator/user.validator';

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}
