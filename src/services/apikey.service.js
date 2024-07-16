import { APIKey } from "../models/index.js";

const APIKeyService = {
  async findByKey(key) {
    return await APIKey.findOne({ key, active: true });
  },
  async add({ key, active = true, permissions = [] }) {
    return await APIKey.create({ key, active, permissions });
  },
};

export default APIKeyService;
