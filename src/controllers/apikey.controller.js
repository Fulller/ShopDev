import { APIKeyService } from "../services/index.js";
import _ from "lodash";

const APIKeyController = {
  async add(req, res) {
    const { key, permissions } = req.body;
    const apiKey = await APIKeyService.add({ key, permissions });
    res.fly({
      status: 201,
      message: "Message add new API key succesfuly!",
      metadata: { apiKey },
    });
  },
};
export default APIKeyController;
