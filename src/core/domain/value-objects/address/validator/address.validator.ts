import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ClassValidatorFields } from 'src/core/domain/@shared/validator/class-validator-fields';
import { Notification } from 'src/core/domain/@shared/notification/notification';
import { IAddress } from '../entity/address.entity';

export class AddressRules {
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zip_code: string;

  constructor(props: IAddress) {
    Object.assign(this, props);
  }
}

export class AddressValidator extends ClassValidatorFields {
  validate(notification: Notification, entity: IAddress): boolean {
    return super.validate(notification, new AddressRules(entity));
  }
}

export class AddressValidatorFactory {
  static create(): AddressValidator {
    return new AddressValidator();
  }
}
