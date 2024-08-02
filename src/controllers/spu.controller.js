import SPUService from "../services/spu.service.js";
import _ from "lodash";

const SPUController = {
  async create(req, res) {
    return res.fly({
      status: 201,
      metadata: await SPUService.create(
        _.set(req.body, "spu_shop", req.user._id)
      ),
    });
  },
  async get(req, res) {
    return res.fly({
      status: 200,
      metadata: await SPUService.get(req.params.spu_id),
    });
  },
};
export default SPUController;
