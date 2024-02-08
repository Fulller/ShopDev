import httpCode from "./statusCode.js";
import reasonCode from "./reasonCode.js";

export default (statusCode) => {
  let code = statusCode;
  let reason = "";
  let success = false;
  for (let key in httpCode) {
    if (httpCode[key] == code) {
      reason = reasonCode[key];
    }
  }
  if (code >= 200 && code < 300) {
    success = true;
  }
  return {
    code,
    reason,
    success,
  };
};
