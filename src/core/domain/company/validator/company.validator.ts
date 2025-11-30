import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CompanyProps } from '../entity/company.entity';
import { ClassValidatorFields } from 'src/core/domain/@shared/validator/class-validator-fields';
import { Notification } from 'src/core/domain/@shared/notification/notification';
import { IAddress } from '../../value-objects/address/entity/address.entity';

export class CompanyRules {
  @IsString()
  @IsNotEmpty()
  owner_id: string;

  @IsString()
  @IsNotEmpty()
  corporate_reason: string;

  @IsString()
  @IsNotEmpty()
  fantasy_name: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsOptional()
  address: IAddress | null;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsString()
  @IsOptional()
  website: string | null;

  @IsString()
  @IsOptional()
  logo_url: string | null;

  constructor(props: CompanyProps) {
    this.owner_id = props.owner_id;
    this.corporate_reason = props.corporate_reason;
    this.fantasy_name = props.fantasy_name;
    this.cnpj = props.cnpj;
    this.industry = props.industry;
    this.description = props.description ?? null;
    this.address = props.address ?? null;
    this.website = props.website ?? null;
    this.logo_url = props.logo_url ?? null;
  }
}

export class CompanyValidator extends ClassValidatorFields {
  validate(notification: Notification, entity: CompanyProps): boolean {
    return super.validate(notification, new CompanyRules(entity));
  }
}
