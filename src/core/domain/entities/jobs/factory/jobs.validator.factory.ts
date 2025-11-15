import { JobsValidator } from '../validator/jobs.validator';

export class JobsValidatorFactory {
  static create(): JobsValidator {
    return new JobsValidator();
  }
}
