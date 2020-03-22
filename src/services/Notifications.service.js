import { Notification } from "../models/Notification.model";

export class NotificationsService {
  notifications = [];

  notificationTimeoutMs;
  maxNotifications;
  cleanUpIntervalMs;

  constructor(
    notificationTimeout = 60000,
    maxNotifications = 200,
    cleanUpInterval = 5000
  ) {
    this.notificationTimeoutMs = notificationTimeout;
    this.maxNotifications = maxNotifications;
    this.cleanUpIntervalMs = cleanUpInterval;

    // cleanup loop
    setInterval(() => {
      this.notifications = [
        ...this.notifications.filter(
          n => !n.isExpired(this.notificationTimeoutMs)
        )
      ];
    }, this.cleanUpIntervalMs);
  }

  clearAll() {
    this.notifications = [];
  }

  add(color, serviceName, title, content) {
    const notification = new Notification(color, serviceName, title, content);
    this.notifications = [
      notification,
      ...this.notifications.slice(0, this.maxNotifications - 1)
    ];
  }
}
