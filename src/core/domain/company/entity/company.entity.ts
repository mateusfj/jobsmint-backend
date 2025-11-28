import { BaseEntity } from 'src/core/shared/base-entity/base-entity.abstract';
import { NotificationError } from 'src/core/shared/exceptions/domain.exceptions';
import { CompanyValidatorFactory } from '../factory/company.validator.factory';

export interface CompanyProps {
  id?: string;
  user_id: string;
  corporate_reason: string;
  cnpj: string;
  description: string;
  website?: string | null;
  logo_url?: string | null;
}

export class Company extends BaseEntity {
  id: string;
  user_id: string;
  corporate_reason: string;
  cnpj: string;
  description: string;
  website: string | null;
  logo_url: string | null;

  constructor({
    id,
    user_id,
    corporate_reason,
    cnpj,
    description,
    website,
    logo_url,
  }: CompanyProps) {
    super();
    this.id = id ?? '';
    this.user_id = user_id;
    this.corporate_reason = corporate_reason;
    this.cnpj = cnpj;
    this.description = description;
    this.website = website ?? null;
    this.logo_url = logo_url ?? null;
    this.validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(entity: Company) {
    const validator = CompanyValidatorFactory.create();
    validator.validate(this.notification, entity);
  }
}
