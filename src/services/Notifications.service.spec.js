import { NotificationsService } from "./Notifications.service";

describe("NotificationsService", () => {
  describe("addNotifications", () => {
    let sut;

    beforeEach(() => {
      sut = new NotificationsService();
    });

    it("should add a notification", () => {
      sut.add("#FFFFFF", "my-service", "my-title", "my-content");
      expect(sut.notifications.length).toEqual(1);
    });
  });
});
