import Template from "../models/template.model.js";
import createHttpError from "http-errors";

const TemplateService = {
  async add({ tem_id, tem_name, tem_html }) {
    const template = await Template.findOne({ tem_id });
    if (template) {
      throw createHttpError(400, "TemplateID has existed");
    }
    return await Template.create({ tem_id, tem_name, tem_html });
  },
  async get({ tem_id }) {
    const template = await Template.findOne({ tem_id });
    if (!template) {
      throw createHttpError(404, "TemplateID not found");
    }
    return template;
  },
};

export default TemplateService;
