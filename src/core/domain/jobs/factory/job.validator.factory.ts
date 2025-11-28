import { JobValidator } from '../validator/job.validator';

export class JobValidatorFactory {
  static create(): JobValidator {
    return new JobValidator();
  }
}
