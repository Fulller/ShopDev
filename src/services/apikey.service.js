import { APIKey } from "../models/index.js";
import createHttpError from "http-errors";

const APIKeyService = {
  async findByKey(key) {
    return await APIKey.findOne({ key, active: true });
  },
  async add({ key, active = true, permissions = [] }) {
    if (!key) {
      throw createHttpError(400, "No key");
    }
    return await APIKey.create({ key, active, permissions });
  },
};

export default APIKeyService;
