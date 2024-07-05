import NotificationService from "../services/notification.service.js";

const NotificationController = {
  async listNotiByUser(req, res) {
    return res.fly({
      status: 200,
      message: "Get list notification successfuly",
      metadata: await NotificationService.listNotiByUser(req.query),
    });
  },
};

export default NotificationController;
