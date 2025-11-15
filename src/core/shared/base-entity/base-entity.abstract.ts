import { Notification } from '../notification/notification';

export abstract class BaseEntity {
  public notification: Notification;

  protected constructor() {
    this.notification = new Notification();
  }
}
