import { NotificationsService } from "./Notifications.service";
import { Notification } from "../models/Notification.model";

describe("NotificationsService", () => {
  let sut;

  const maxNotifications = 5;
  const notificationTimeoutMs = 100;
  const cleanUpIntervalMs = 100;

  beforeEach(() => {
    sut = new NotificationsService(notificationTimeoutMs, maxNotifications, cleanUpIntervalMs);
  });

  describe("add", () => {
    it("should add a notification", () => {
      const expectedNotification = new Notification("#FFFFFF", "my-service", "my-title", "my-content");

      sut.add("#FFFFFF", "my-service", "my-title", "my-content");

      expect(sut.notifications.length).toEqual(1);
      expect(sut.notifications[0]).toStrictEqual(expectedNotification);
    });

    it("should limit notifications to the max amount", () => {
      for (let i = 0; i < maxNotifications + 5; ++i) {
        sut.add("#FFFFFF", "my-service", "my-title", "my-content");
      }

      expect(sut.notifications.length).toEqual(maxNotifications);
    });
  });

  describe("clearAll", () => {
    it("should clear all notifications", () => {
      sut.add("#FFFFFF", "my-service", "my-title", "my-content");
      sut.add("#FFFFFF", "my-service", "my-title", "my-content");

      sut.clearAll();

      expect(sut.notifications.length).toEqual(0);
    });
  });

  describe("notification expired", () => {
    it ("should be removed", done => {
      sut.add("#FFFFFF", "my-service", "my-title", "my-content");
      sut.add("#FFFFFF", "my-service", "my-title", "my-content");

      expect(sut.notifications.length).toEqual(2);
      setTimeout(() => {
        // both notifications must have expired
        expect(sut.notifications.length).toEqual(0);
        done();
      }, 3 * notificationTimeoutMs);
    })
  })
});
