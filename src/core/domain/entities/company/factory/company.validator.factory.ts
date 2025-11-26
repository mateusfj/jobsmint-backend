import { CompanyValidator } from '../validator/company.validator';

export class CompanyValidatorFactory {
  static create(): CompanyValidator {
    return new CompanyValidator();
  }
}
