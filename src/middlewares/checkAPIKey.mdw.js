import { APIKeyService } from "../services/index.js";
import { HEADER } from "../configs/const.config.js";
import createHttpError from "http-errors";
import _ from "lodash";

async function checkAPIKey(req, res, next) {
  try {
    const providedApiKey = req.headers[HEADER.API_KEY];
    const storedApiKey = await APIKeyService.findByKey(providedApiKey);
    if (!storedApiKey) {
      throw createHttpError(403, "Invalid API key");
    }
    req.apiKey = storedApiKey;
    next();
  } catch (err) {
    next(err);
  }
}

export default checkAPIKey;
