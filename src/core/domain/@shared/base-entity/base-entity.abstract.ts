import { Notification } from 'src/core/domain/@shared/notification/notification';

export abstract class BaseEntity {
  public notification: Notification;

  protected constructor() {
    this.notification = new Notification();
  }
}
