import RBACService from "../services/rbac.service.js";
import RedisService from "../services/redis.pubsub.service.js";

const RRACController = {
  async newRole(req, res) {
    return res.fly({
      status: 200,
      message: "Create new role successfully",
      metadata: await RBACService.newRole(req.body),
    });
  },
  async newResource(req, res) {
    return res.fly({
      status: 200,
      message: "Create new resource successfully",
      metadata: await RBACService.newResource(req.body),
    });
  },
  async addGrantToRole(req, res) {
    return res.fly({
      status: 200,
      message: "Add new grant to role successfully",
      metadata: await RBACService.addGrantToRole(req.body),
    });
  },
  async listGrant(req, res) {
    return res.fly({
      status: 200,
      message: "Get grant list successfully",
      metadata: await RBACService.listGrant(),
    });
  },
};
export default RRACController;
