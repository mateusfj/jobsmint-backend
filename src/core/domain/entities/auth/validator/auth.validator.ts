import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { AuthProps } from '../entity/auth.entity';
import { ERole } from 'src/shared/enums/ERole';
import { ClassValidatorFields } from 'src/core/shared/validator/class-validator-fields';
import { Notification } from 'src/core/shared/notification/notification';

class AuthRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(ERole)
  @IsNotEmpty()
  role: ERole;

  constructor(props: AuthProps) {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
  }
}

export class AuthValidator extends ClassValidatorFields {
  validate(notification: Notification, entity: AuthProps): boolean {
    return super.validate(notification, new AuthRules(entity));
  }
}
