import crypto from "crypto";

function generateRandomPassword(length = 12) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}
export default generateRandomPassword;
