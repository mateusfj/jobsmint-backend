import { BaseEntity } from 'src/core/domain/@shared/base-entity/base-entity.abstract';
import { NotificationError } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { CompanyValidatorFactory } from '../factory/company.validator.factory';
import { Address } from '../../value-objects/address/entity/address.entity';

export interface CompanyProps {
  id?: string;
  owner_id: string;
  corporate_reason: string;
  fantasy_name: string;
  cnpj: string;
  industry: string;
  phone: string;
  address?: Address | null;
  description?: string | null;
  website?: string | null;
  logo_url?: string | null;
}

export class Company extends BaseEntity {
  id: string;
  owner_id: string;
  corporate_reason: string;
  fantasy_name: string;
  cnpj: string;
  industry: string;
  phone: string;
  address?: Address | null;
  description?: string | null;
  website?: string | null;
  logo_url?: string | null;

  constructor(props: CompanyProps) {
    super();
    this.id = props.id ?? '';
    this.owner_id = props.owner_id;
    this.corporate_reason = props.corporate_reason;
    this.fantasy_name = props.fantasy_name;
    this.industry = props.industry;
    this.cnpj = props.cnpj;
    this.phone = props.phone;
    this.description = props.description ?? null;
    this.address = props.address ?? null;
    this.website = props.website ?? null;
    this.logo_url = props.logo_url ?? null;
    this.validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(entity: Company) {
    const validator = CompanyValidatorFactory.create();
    validator.validate(this.notification, entity);
  }

  setAddress(address: Address | null) {
    this.address = address ?? null;
  }
}
