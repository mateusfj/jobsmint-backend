import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { UserProps } from '../entity/user.entity';
import { ERole } from 'src/core/domain/@shared/enums/ERole';
import { ClassValidatorFields } from 'src/core/domain/@shared/validator/class-validator-fields';
import { Notification } from 'src/core/domain/@shared/notification/notification';

class UserRules {
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

  constructor(props: UserProps) {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
  }
}

export class UserValidator extends ClassValidatorFields {
  validate(notification: Notification, entity: UserProps): boolean {
    return super.validate(notification, new UserRules(entity));
  }
}
