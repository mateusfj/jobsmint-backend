import { ERole } from 'src/core/shared/utils/enums/ERole';

import { UserValidatorFactory } from '../factory/user.validator.factory';
import { BaseEntity } from 'src/core/shared/base-entity/base-entity.abstract';
import { NotificationError } from 'src/core/shared/exceptions/domain.exceptions';

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: ERole;
  isActive?: boolean;
}

export class User extends BaseEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  role: ERole;
  isActive: boolean;

  constructor(props: UserProps) {
    super();
    this.id = props.id ?? '';
    this.role = props.role;
    this.name = props.name;
    this.password = props.password;
    this.email = props.email;
    this.isActive = true;
    this.validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(entity: User) {
    const validator = UserValidatorFactory.create();
    validator.validate(this.notification, entity);
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }
}
