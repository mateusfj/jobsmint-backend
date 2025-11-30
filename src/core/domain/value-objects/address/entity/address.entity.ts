import { NotificationError } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { AddressValidatorFactory } from '../validator/address.validator';
import { BaseEntity } from 'src/core/domain/@shared/base-entity/base-entity.abstract';

export interface IAddress {
  number: number;
  street: string;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  zip_code: string;
}

export class Address extends BaseEntity {
  number: number;
  street: string;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  zip_code: string;
  constructor(address: IAddress) {
    super();
    this.number = address.number;
    this.street = address.street;
    this.neighborhood = address.neighborhood;
    this.city = address.city;
    this.state = address.state;
    this.zip_code = address.zip_code;
    this.complement = address.complement;
    this.validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(entity: Address) {
    const validator = AddressValidatorFactory.create();
    validator.validate(this.notification, entity);
  }
}
