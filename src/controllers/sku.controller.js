import SKUService from "../services/sku.service.js";

const SKUController = {
  async create(req, res) {
    return res.fly({
      status: 201,
      metadata: await SKUService.create(req.body),
    });
  },
  async lookup(req, res) {
    return res.fly({
      status: 200,
      metadata: await SKUService.lookup(req.body),
    });
  },
};
export default SKUController;
