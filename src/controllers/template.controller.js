import TemplateService from "../services/template.service.js";

const TemplateController = {
  async add(req, res) {
    return res.fly({
      status: 200,
      message: "Add new template successfully",
      metadata: await TemplateService.add(req.body),
    });
  },
};
export default TemplateController;
