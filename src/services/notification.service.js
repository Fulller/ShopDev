import Notification from "../models/notification.model.js";
import { NOTI_TYPES } from "../configs/const.config.js";

const NotificationService = {
  async pushNotiToSystem({
    type = NOTI_TYPES.ORDER_001,
    senderId = 1,
    receivedId = 1,
    options = {},
  }) {
    const noti_content = {
      [NOTI_TYPES.ORDER_001]: "@@@ order 001 content: @@@@",
      [NOTI_TYPES.ORDER_002]: "@@@ ordre 002 content: @@@@",
      [NOTI_TYPES.PROMOTION_001]: "@@@ has just add a new voucher: @@@@@",
      [NOTI_TYPES.SHOP_001]: "@@@ has just added a new product: @@@@",
    }[type];
    return await Notification.create({
      noti_type: type,
      noti_senderId: senderId,
      noti_receivedId: receivedId,
      noti_content,
      noti_options: options,
    });
  },
  async listNotiByUser({ userId = 1, type = "ALL", isReaded = 0 }) {
    const match = { noti_receivedId: userId };
    if (type != "ALL") {
      match.noti_type = type;
    }
    return await Notification.aggregate([
      { $match: match },
      {
        $project: {
          noti_type: 1,
          noti_senderId: 1,
          noti_receivedId: 1,
          noti_content: 1,
          noti_options: 1,
          createAt: 1,
        },
      },
    ]);
  },
};
export default NotificationService;
