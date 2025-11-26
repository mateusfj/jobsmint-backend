import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { CompanyProps } from '../entity/company.entity';
import { ClassValidatorFields } from 'src/core/shared/validator/class-validator-fields';
import { Notification } from 'src/core/shared/notification/notification';

export class CompanyRules {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  corporate_reason: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsOptional()
  website?: string | null;

  @IsUrl()
  @IsOptional()
  logo_url?: string | null;

  constructor(props: CompanyProps) {
    this.user_id = props.user_id;
    this.corporate_reason = props.corporate_reason;
    this.cnpj = props.cnpj;
    this.description = props.description;
    this.website = props.website;
    this.logo_url = props.logo_url;
  }
}

export class CompanyValidator extends ClassValidatorFields {
  validate(notification: Notification, entity: CompanyProps): boolean {
    return super.validate(notification, new CompanyRules(entity));
  }
}
